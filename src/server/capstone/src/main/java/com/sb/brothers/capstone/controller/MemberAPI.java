package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.configuration.jwt.JWTFilter;
import com.sb.brothers.capstone.dto.StoreDto;
import com.sb.brothers.capstone.dto.OrderDto;
import com.sb.brothers.capstone.dto.PostDto;
import com.sb.brothers.capstone.entities.*;
import com.sb.brothers.capstone.global.GlobalData;
import com.sb.brothers.capstone.services.*;
import com.sb.brothers.capstone.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
public class MemberAPI {

    private static final Logger logger = LoggerFactory.getLogger(JWTFilter.class);

    @Autowired
    private PostService postService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostDetailService postDetailService;

    @Autowired
    private PostManagerService postManagerService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private BookService bookService;

    //books session
    @PostMapping("/checkout")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> checkout(Authentication auth, @RequestBody OrderDto orderDto){
        logger.info("[API-Member] checkout - START");
        logger.info("Return rent books");
        List<PostDto> postDtos = GlobalData.cart.get(auth.getName());
        if((postDtos == null || postDtos.isEmpty()) && (orderDto.getOrders() == null || orderDto.getOrders().isEmpty())){
            logger.warn("The cart of user:"+ auth.getName()+" is empty.");
            logger.info("[API-Member] checkout - END");
            return new ResponseEntity<>(new CustomErrorType("Giỏ hàng của bạn trống."), HttpStatus.OK);
        }
        int total = 0;
        List<Order> orders = new ArrayList<>();
        User user = null;
        for(PostDto postDto : orderDto.getOrders()){
            Order order = new Order();
            Post post = postService.getPostById(postDto.getId()).get();
            if(post.getStatus() != CustomStatus.ADMIN_POST){
                logger.info("[API-Member] checkout - END");
                return new ResponseEntity<>(new CustomErrorType("Sản phẩm đã được thuê trước đó, đặt hàng và thanh toán thất bại."), HttpStatus.OK);
            }
            user = userService.getUserById(auth.getName()).get();
            order.setPost(post);
            order.setUser(user);
            //order.setStatus(CustomStatus.USER_PAYMENT_SUCCESS);
            List<PostDetail> postDetails = postDetailService.findAllByPostId(postDto.getId());
            for(PostDetail postDetail : postDetails){
                total += postDetail.getBook().getPrice()*postDetail.getQuantity();
            }
            Date d = new Date();
            total += post.getFee();
            order.setBorrowedDate(d);
            Date dr = new Date(d.getTime() + (OrderDto.milisecondsPerDay * post.getNoDays()));
            order.setReturnDate(dr);
            order.setTotalPrice(total);
            orders.add(order);
        }
        if(total <= user.getBalance()){
            for(Order order : orders) {
                orderService.save(order);
                changePostStatus(auth, order.getId(), CustomStatus.USER_PAYMENT_SUCCESS);
                if(postDtos != null) {
                    postDtos.removeIf(p -> p.getId() == order.getPost().getId());
                }
            };
        }
        else{
            logger.info("[API-Member] checkout - END");
            return new ResponseEntity<>(new CustomErrorType("Số tiền trong tài khoản không đủ để thực hiện giao dịch. Vui lòng kiểm tra lại."), HttpStatus.OK);
        }
        user.setBalance(user.getBalance() - total);
        userService.updateUser(user);
        logger.info("[API-Member] checkout - SUCCESS");
        return new ResponseEntity<>(new CustomErrorType(true, "Thanh toán thành công."), HttpStatus.OK);
    }//view all books

    boolean checkAccount(int bookId){
        List<Role> roles = roleService.getAllRoleByBookId(bookId);
        for (Role role : roles){
            if(role.getName().compareTo("ROLE_ADMIN") == 0 || role.getName().compareTo("ROLE_MANAGER_POST") == 0)
                return true;
        }
        return false;
    }

    void updateBalance(Book book, int discount){
        User user = book.getUser();
        user.setBalance(user.getBalance() +discount);
        userService.updateUser(user);
    }

    int discountForPartner(Post post, List<PostDetail> postDetails){
        int discount = 0;
        int totalQuantity = postDetails.stream().mapToInt(PostDetail::getQuantity).sum();
        for (PostDetail postDetail : postDetails){
            Book book = postDetail.getBook();
            if(!checkAccount(book.getId())) {
                discount += (book.getPercent() * post.getFee()/totalQuantity *postDetail.getQuantity()) /100;
                updateBalance(book, discount);
                Notification notification = new Notification();
                notification.setUser(book.getUser());
                notification.setDescription("Bạn đã nhận được "+discount+"vnđ tiền chiết khấu khi có người thuê sách "+ book.getName() + " của bạn.");
                notificationService.updateNotification(notification);
            }
        }
        return discount;
    }

    void refunds(List<PostDetail> postDetails, Post post, User user){
        int sum = 0;
        for (PostDetail postDetail : postDetails) {
            Book book = postDetail.getBook();
            book.setInStock(book.getInStock() + postDetail.getQuantity());
            bookService.updateBook(book);
            sum += book.getPrice() * postDetail.getQuantity();
        }
        int expiredFee = expired(post);
        if(expiredFee > (user.getBalance() + sum)){
            expiredFee = user.getBalance() + sum;
            user.setBalance(0);
        }
        else {
            user.setBalance(user.getBalance() + sum - expiredFee);
            Notification notification = new Notification();
            notification.setUser(user);
            notification.setDescription("Bạn đã được hoàn "+sum+"vnđ tiền cọc vào tài khoản.");
            notificationService.updateNotification(notification);
        }
        if(expiredFee> 0){
            Notification notification = new Notification();
            notification.setUser(user);
            notification.setDescription("Bạn đã bị trừ "+expiredFee+"vnđ do trả sách quá hạn.");
            notificationService.updateNotification(notification);
        }
        userService.updateUser(user);
        User mng = post.getUser();
        mng.setBalance(mng.getBalance() + expiredFee - sum);
        Notification notification = new Notification();
        notification.setUser(mng);
        notification.setDescription("Bạn đã bị trừ "+(sum - expiredFee)+"vnđ do hoàn tiền cọc cho " + user.getFirstName() + " " + user.getLastName() +" khi họ trả sách.");
        notificationService.updateNotification(notification);
        userService.updateUser(mng);
    }

    @PreAuthorize("hasRole('ROLE_MANAGER_POST')")
    @PutMapping("/order/confirmation/{id}")
    public ResponseEntity<?> waitingStatus(Authentication auth, @PathVariable("id") int id){
        return changePostStatus(auth, id, CustomStatus.USER_WAIT_TAKE_BOOK);
    }//form edit post, fill old data into form

    @PreAuthorize("hasRole('ROLE_MANAGER_POST')")
    @PutMapping("/order/received/{id}")
    public ResponseEntity<?> acceptOrdertatus(Authentication auth, @PathVariable("id") int id){
        return changePostStatus(auth, id, CustomStatus.USER_RETURN_IS_NOT_APPROVED);
    }//form edit post, fill old data into form

    @PreAuthorize("hasRole('ROLE_MANAGER_POST')")
    @PutMapping("/order/cancellation/{id}")
    public ResponseEntity<?> orderCancellation(Authentication auth, @PathVariable("id") int id){
        return changePostStatus(auth, id, CustomStatus.USER_REQUEST_IS_DENY);
    }//form edit post, fill old data into form

    @PreAuthorize("hasRole('ROLE_MANAGER_POST')")
    @PutMapping("/order/book-returns/{id}")
    public ResponseEntity<?> orderReturns(Authentication auth, @PathVariable("id") int id){
        return changePostStatus(auth, id, CustomStatus.USER_RETURN_IS_APPROVED);
    }//form edit post, fill old data into form

    @PreAuthorize("hasRole('ROLE_MANAGER_POST')")
    @PutMapping("/post/disable/{id}")
    public ResponseEntity<?> disablePost(Authentication auth, @PathVariable("id") int id){
        return changePostStatus(auth, id, CustomStatus.ADMIN_DISABLE_POST);
    }//form edit post, fill old data into form

    ResponseEntity<?> changePostStatus(Authentication auth, int oId, int status){
        logger.info("[API-Member] changePostStatus - START");
        Order order = orderService.getOrderById(oId).get();
        Post currPost = order.getPost();
        if(status != CustomStatus.USER_PAYMENT_SUCCESS){
            int storeId = StoreUtils.findStoreIdByAddress(currPost.getAddress());
            if(storeId == -1){
                logger.info("[API-Member] changePostStatus - END");
                return new ResponseEntity(new CustomErrorType("Bạn không phải quản lý của của hàng sách có bài đăng này."), HttpStatus.OK);
            }
            Optional<User> user = userService.getUserById(auth.getName());
            if(user.isPresent()){
                if(user.get().getAddress() == null)
                    user.get().setAddress("");
                if(!StoreUtils.findManagerByStoreId(storeId, auth.getName()) && currPost.getAddress().compareTo(user.get().getAddress()) != 0){
                    logger.info("[API-Member] changePostStatus - END");
                    return new ResponseEntity(new CustomErrorType("Bạn không phải quản lý của của hàng sách có bài đăng này."), HttpStatus.OK);
                }
            }
            else{
                logger.info("[API-Member] changePostStatus - END");
                return new ResponseEntity(new CustomErrorType("Bạn không phải quản lý của của hàng sách có bài đăng này."), HttpStatus.OK);
            }
        }
        if(currPost != null) {
            User user = null;
            List<PostDetail> postDetails = postDetailService.findAllByPostId(currPost.getId());
            if (currPost.getStatus() == CustomStatus.USER_PAYMENT_SUCCESS) {
                try {
                    user = order.getUser();
                    if (status == CustomStatus.USER_WAIT_TAKE_BOOK) {
                        //@TODO triết khấu cho user đã ký gửi
                        int discount = discountForPartner(currPost, postDetails);
                        //@TODO cộng tiền cho manager đăng bài
                        User manager = currPost.getUser();
                        manager.setBalance(manager.getBalance() + order.getTotalPrice() - discount);
                        userService.updateUser(manager);
                        Notification notify = new Notification();
                        notify.setUser(manager);
                        notify.setDescription("Bạn được cộng " + (order.getTotalPrice() - discount) + "vnđ do có người dùng: " + user.getFirstName() + " " + user.getLastName() +" thuê sách.");
                        notificationService.updateNotification(notify);
                    } else if (status == CustomStatus.USER_REQUEST_IS_DENY) {
                        //@TODO hoàn tiền cho user đã order
                        user.setBalance(user.getBalance() + order.getTotalPrice());
                        userService.updateUser(user);
                        Notification ntf = new Notification();
                        ntf.setUser(user);
                        ntf.setDescription("Bạn được hoàn "+order.getTotalPrice()+"vnđ do Admin đã hủy đơn hàng có MĐH: CS"+ currPost.getId());
                        notificationService.updateNotification(ntf);
                        status = CustomStatus.ADMIN_POST;
                        orderService.delete(order);
                    }
                    if (currPost.getStatus() == status) {
                        logger.info("[API-Member] changePostStatus - END");
                        return new ResponseEntity<>(new CustomErrorType("Trạng thái đơn hàng không thay đổi."), HttpStatus.OK);
                    } else postService.updateStatus(currPost.getId(), status);
                } catch (Exception ex) {
                    logger.warn("Exception: " + ex.getMessage() + (ex.getCause() != null ? ". " + ex.getCause() : ""));
                    logger.info("[API-Member] changePostStatus - END");
                    return new ResponseEntity(new CustomErrorType("Xảy ra lỗi: "+ex.getMessage() + ".\n Nguyên nhân: " + ex.getCause()), HttpStatus.OK);
                }
            }
            else if (currPost.getStatus() == CustomStatus.USER_WAIT_TAKE_BOOK) {
                if (status == CustomStatus.USER_RETURN_IS_NOT_APPROVED) {
                    //@TODO
                    //refunds(postDetails);
                    logger.info("User has took the books.");
                }
            }
            else if (currPost.getStatus() == CustomStatus.ADMIN_POST) {
                if (status == CustomStatus.ADMIN_DISABLE_POST) {
                    //@TODO
                    //refunds(postDetails);
                    logger.info("Admin disable this post.");
                }
                if (status == CustomStatus.USER_PAYMENT_SUCCESS) {
                    //@TODO
                    //refunds(postDetails);
                    logger.info("user payment success this post.");
                }
            }
            else if (currPost.getStatus() == CustomStatus.USER_RETURN_IS_NOT_APPROVED) {
                if (status == CustomStatus.USER_RETURN_IS_APPROVED) {
                    //@TODO hoàn tiền cho người thuê / trừ tiền manager giữ cọc
                    logger.info("Refund to tenants.");
                    refunds(postDetails, order.getPost(), order.getUser());
                }
            }
            else {
                logger.info("[API-Member] changePostStatus - END");
                return new ResponseEntity<>(new CustomErrorType("Không thể thay đổi trạng thái đơn hàng. Vui lòng kiểm tra lại."), HttpStatus.OK);
            }
        }
        else {
            logger.info("[API-Member] changePostStatus - END");
            return new ResponseEntity<>(new CustomErrorType("Đơn hàng có mã: " + oId + " không tồn tại. Cập nhật trạng thái thất bại."), HttpStatus.OK);
        }
        currPost.setStatus(status);   //set status post
        /*ManagerPost managerPost = new ManagerPost();
        managerPost.setPost(currPost);
        managerPost.setUser(userService.getUserById(auth.getName()).get());
        managerPost.setContent(auth.getName() + " has changed order status with id is " + currPost.getId()+ "to "+(status == CustomStatus.USER_REQUEST_IS_DENY ? "Deny.": "Accept."));
        *///currPost.setManager(userService.getUserById(auth.getName()).get());
        /*postManagerService.save(managerPost);*/
        currPost.setModifiedDate(new Date());
        logger.info("Fetching & Change order status with id: " + currPost.getId());
        postService.updatePost(currPost);
        logger.info("Change order status with post id:"+ currPost.getId() +" - SUCCESS.");
        logger.info("[API-Member] changePostStatus - SUCCESS");
        return new ResponseEntity<>(new CustomErrorType(true, "Đã cập nhật trạng thái đơn hàng."), HttpStatus.OK);
    }

    int expired(Post post){
        long expiredDay = post.getCreatedDate().getTime() + post.getNoDays()*OrderDto.milisecondsPerDay;
        long currDay    = new Date().getTime();
        if(expiredDay < currDay){
            return (int) ((post.getFee() * (currDay-expiredDay)/OrderDto.milisecondsPerDay)/100);
        }
        return 0;
    }
}
