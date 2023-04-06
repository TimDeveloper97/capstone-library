package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.configuration.jwt.JWTFilter;
import com.sb.brothers.capstone.dto.BookDTO;
import com.sb.brothers.capstone.dto.OrderDto;
import com.sb.brothers.capstone.dto.PostDto;
import com.sb.brothers.capstone.entities.*;
import com.sb.brothers.capstone.global.GlobalData;
import com.sb.brothers.capstone.services.*;
import com.sb.brothers.capstone.util.CustomErrorType;
import com.sb.brothers.capstone.util.CustomStatus;
import com.sb.brothers.capstone.util.ResData;
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

    //books session
    @PostMapping("/checkout")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> checkout(Authentication auth, @RequestBody OrderDto orderDto){
        logger.info("Return rent books");
        List<PostDto> postDtos = GlobalData.cart.get(auth.getName());
        if((postDtos == null || postDtos.isEmpty()) && (orderDto.getOrders() == null || orderDto.getOrders().isEmpty())){
            logger.warn("The cart of user:"+ auth.getName()+" is empty.");
            return new ResponseEntity<>(new CustomErrorType("Giỏ hàng của bạn trống."), HttpStatus.OK);
        }
        int total = 0;
        List<Order> orders = new ArrayList<>();
        User user = null;
        for(PostDto postDto : orderDto.getOrders()){
            Order order = new Order();
            Post post = postService.getPostById(postDto.getId()).get();
            if(post.getStatus() != CustomStatus.ADMIN_POST){
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
        if(total < user.getBalance()){
            for(Order order : orders) {
                orderService.save(order);
                changePostStatus(auth, order.getId(), CustomStatus.USER_PAYMENT_SUCCESS);
                if(postDtos != null) {
                    postDtos.removeIf(p -> p.getId() == order.getPost().getId());
                }
            };
        }
        else{
            return new ResponseEntity<>(new CustomErrorType("Số tiền trong tài khoản không đủ để thực hiện giao dịch. Vui lòng kiểm tra lại."), HttpStatus.OK);
        }
        user.setBalance(user.getBalance() - total);
        userService.updateUser(user);
        logger.info("Checkout- SUCCESS.");
        return new ResponseEntity<>(new CustomErrorType(true, "Thanh toán thành công."), HttpStatus.OK);
    }//view all books

    boolean checkAccount(int bookId){
        List<Role> roles = roleService.getAllRoleByBookId(bookId);
        for (Role role : roles){
            if(role.getName().compareTo("ROLE_ADMIN") == 0)
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
        for (PostDetail postDetail : postDetails){
            Book book = postDetail.getBook();
            if(!checkAccount(book.getId())) {
                discount += (book.getPercent() * post.getFee() *postDetail.getQuantity()) /100;
                updateBalance(book, discount);
                Notification notification = new Notification();
                notification.setUser(book.getUser());
                notification.setDescription("Bạn đã nhận được "+discount+"vnđ tiền chiết khấu khi có người thuê sách "+ book.getName() + " của bạn.");
                //notification.setCreatedDate(new Date());
                //notification.setStatus(0);
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
            sum += book.getPrice();
        }
        int expiredFee = expired(post);
        if(expiredFee > (user.getBalance() + sum)){
            expiredFee = user.getBalance() + sum;
            user.setBalance(0);
        }
        else user.setBalance(user.getBalance() + sum - expiredFee);
        if(expiredFee> 0){
            Notification notification = new Notification();
            notification.setUser(user);
            notification.setDescription("Bạn đã bị trừ "+expiredFee+"vnđ do trả sách quá hạn.");
            //notification.setCreatedDate(new Date());
            //notification.setStatus(0);
            notificationService.updateNotification(notification);
        }
        userService.updateUser(user);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER_POST')")
    @PutMapping("/order/confirmation/{id}")
    public ResponseEntity<?> waitingStatus(Authentication auth, @PathVariable("id") int id){
        return changePostStatus(auth, id, CustomStatus.USER_WAIT_TAKE_BOOK);
    }//form edit post, fill old data into form

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER_POST')")
    @PutMapping("/order/received/{id}")
    public ResponseEntity<?> acceptOrdertatus(Authentication auth, @PathVariable("id") int id){
        return changePostStatus(auth, id, CustomStatus.USER_RETURN_IS_NOT_APPROVED);
    }//form edit post, fill old data into form

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER_POST')")
    @PutMapping("/order/cancellation/{id}")
    public ResponseEntity<?> orderCancellation(Authentication auth, @PathVariable("id") int id){
        return changePostStatus(auth, id, CustomStatus.USER_REQUEST_IS_DENY);
    }//form edit post, fill old data into form

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER_POST')")
    @PutMapping("/order/book-returns/{id}")
    public ResponseEntity<?> orderReturns(Authentication auth, @PathVariable("id") int id){
        return changePostStatus(auth, id, CustomStatus.USER_RETURN_IS_APPROVED);
    }//form edit post, fill old data into form

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER_POST')")
    @PutMapping("/post/disable/{id}")
    public ResponseEntity<?> disablePost(Authentication auth, @PathVariable("id") int id){
        return changePostStatus(auth, id, CustomStatus.ADMIN_DISABLE_POST);
    }//form edit post, fill old data into form

    ResponseEntity<?> changePostStatus(Authentication auth, int oId, int status){
        Order order = orderService.getOrderById(oId).get();
        Post currPost = order.getPost();
        if(currPost != null) {
            User user = null;
            List<PostDetail> postDetails = postDetailService.findAllByPostId(currPost.getId());
            if (currPost.getStatus() == CustomStatus.USER_PAYMENT_SUCCESS) {
                try {
                    if (status == CustomStatus.USER_WAIT_TAKE_BOOK) {
                        //@TODO triết khấu cho user đã ký gửi
                        discountForPartner(currPost, postDetails);
                    } else if (status == CustomStatus.USER_REQUEST_IS_DENY) {
                        //@TODO hoàn tiền cho user đã order
                        user = order.getUser();
                        user.setBalance(user.getBalance() + order.getTotalPrice());
                        userService.updateUser(user);
                    }
                    if (currPost.getStatus() == status) {
                        return new ResponseEntity<>(new CustomErrorType("Trạng thái đơn hàng không thay đổi."), HttpStatus.OK);
                    } else postService.updateStatus(currPost.getId(), status);
                } catch (Exception ex) {
                    logger.warn("Exception: " + ex.getMessage() + (ex.getCause() != null ? ". " + ex.getCause() : ""));
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
                    //@TODO hoàn tiền cho người thuê
                    logger.info("Refund to tenants.");
                    refunds(postDetails, order.getPost(), order.getUser());
                }
            }
            else return new ResponseEntity<>(new CustomErrorType("Không thể thay đổi trạng thái đơn hàng. Vui lòng kiểm tra lại."), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(new CustomErrorType("Đơn hàng có mã: " + oId + " không tồn tại. Cập nhật trạng thái thất bại."), HttpStatus.OK);
        }
        currPost.setStatus(status);   //set status post
        ManagerPost managerPost = new ManagerPost();
        managerPost.setPost(currPost);
        managerPost.setUser(userService.getUserById(auth.getName()).get());
        managerPost.setContent(auth.getName() + " has changed order status with id is " + currPost.getId()+ "to "+(status == CustomStatus.USER_REQUEST_IS_DENY ? "Deny.": "Accept."));
        //currPost.setManager(userService.getUserById(auth.getName()).get());
        postManagerService.save(managerPost);
        currPost.setModifiedDate(new Date());
        logger.info("Fetching & Change order status with id: " + currPost.getId());
        postService.updatePost(currPost);
        logger.info("Change order status with post id:"+ currPost.getId() +" - SUCCESS.");
        return new ResponseEntity<>(new CustomErrorType(true, "Đã cập nhật trạng thái đơn hàng."), HttpStatus.OK);
    }

    int expired(Post post){
        long expiredDay = post.getCreatedDate().getTime() + post.getNoDays()*OrderDto.milisecondsPerDay;
        long currDay    = new Date().getTime();
        List<PostDetail> postDetails = postDetailService.findAllByPostId(post.getId());
        int noBooks = 0;
        for(PostDetail pd: postDetails){
            noBooks += pd.getQuantity();
        }
        if(expiredDay < currDay){
            return (int) ((post.getFee() * noBooks * (currDay-expiredDay)/OrderDto.milisecondsPerDay)/100);
        }
        return 0;
    }

}
