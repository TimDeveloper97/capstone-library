package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.configuration.jwt.TokenProvider;
import com.sb.brothers.capstone.dto.OrderDto;
import com.sb.brothers.capstone.dto.PostDto;
import com.sb.brothers.capstone.entities.Order;
import com.sb.brothers.capstone.entities.Post;
import com.sb.brothers.capstone.global.GlobalData;
import com.sb.brothers.capstone.services.OrderService;
import com.sb.brothers.capstone.services.PostService;
import com.sb.brothers.capstone.util.CustomErrorType;
import com.sb.brothers.capstone.util.CustomStatus;
import com.sb.brothers.capstone.util.ResData;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class CartController {

    private Logger logger = Logger.getLogger(CartController.class);

    @Autowired
    private PostService postService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private TokenProvider tokenProvider;

    @GetMapping("/cart")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> cartGet(Authentication auth){
        logger.info("[API-Cart] cartGet - START");
        List<PostDto> list = GlobalData.cart.get(auth.getName());
        if(list == null || list.isEmpty()){
            logger.info("[API-Cart] cartGet - END");
            return new ResponseEntity<>(new CustomErrorType("Giỏ hàng trống."), HttpStatus.OK);
        }
        logger.info("[API-Cart] cartGet - SUCCESS");
        return new ResponseEntity<>(new ResData<List<PostDto>>(0,list), HttpStatus.OK);
    }//page cart

    @PutMapping("/order-book/{postId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> addToCart(Authentication auth, @PathVariable("postId") int postId){
        logger.info("[API-Cart] addToCart - START");
        List<PostDto> list = GlobalData.cart.get(auth.getName());
        if(list == null)
            list = new ArrayList<>();
        PostDto postDto = new PostDto();
        Post post = postService.getPostById(postId).get();
        if(post == null || post.getStatus() == CustomStatus.USER_POST_IS_NOT_APPROVED){
            logger.info("[API-Cart] addToCart - END");
            return new ResponseEntity(new CustomErrorType("Không tìm thấy bài đăng có mã: " + postId), HttpStatus.OK);
        }
        for (PostDto pInOrder : list){
            if(pInOrder.getId() == postId){
                logger.info("[API-Cart] addToCart - END");
                return new ResponseEntity(new CustomErrorType("Sản phầm đã có trong giỏ hàng."), HttpStatus.OK);
            }
        }
        postDto.convertPost(post);
        list.add(postDto);
        GlobalData.cart.put(auth.getName(), list);
        logger.info("[API-Cart] addToCart - SUCCESS");
        return new ResponseEntity(new CustomErrorType(true, "Thêm vào giỏ hàng thành công."), HttpStatus.CREATED);
    }//click add from page viewProduct

    @DeleteMapping("/cart/remove-item/{postId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> cartItemRemove(Authentication auth, @PathVariable("postId") int postId){
        logger.info("[API-Cart] cartItemRemove - START");
        List<PostDto> list = GlobalData.cart.get(auth.getName());
        if(list != null) {
            try {
                GlobalData.cart.get(auth.getName()).removeIf(n -> (n.getId() == postId));
            }catch (Exception ex){
                logger.error("This item not exists in your cart.");
                logger.info("[API-Cart] cartItemRemove - END");
                return new ResponseEntity<>(new CustomErrorType("Sản phẩm không có trong giỏ hàng."), HttpStatus.OK);
            }
            return new ResponseEntity(new CustomErrorType(true, "Xóa sản phẩm khỏi giỏ hàng thành công."), HttpStatus.OK);
        }
        logger.info("[API-Cart] cartItemRemove - SUCCESS");
        return new ResponseEntity<>(new CustomErrorType("Giỏ hàng trống."), HttpStatus.OK);
    } // delete 1 product

    //Get All Order session
    @GetMapping("/order/request")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> getAllOrderRequest(Authentication auth){
        logger.info("[API-Cart] getAllOrderRequest - START");
        List<Order> orders = null;
        List<OrderDto> orderDtos = new ArrayList<>();
        try{
            if(tokenProvider.getRoles(auth).contains("ROLE_ADMIN") || tokenProvider.getRoles(auth).contains("ROLE_MANAGER_POST")) {
                logger.info("Return all admin posts");
                orders = orderService.getOrderByStatus();
            }
            else {
                logger.info("Return all user posts");
                orders = orderService.getOrderByStatusForUser(auth.getName());
            }
            for (Order order: orders){
                OrderDto orderDto = new OrderDto(order);
                orderDtos.add(orderDto);
            }
        }catch (Exception ex){
            logger.info("Exception:" + ex.getMessage() +".\n" + ex.getCause());
            logger.info("[API-Cart] getAllOrderRequest - END");
            return new ResponseEntity<>(new CustomErrorType("Xảy ra lỗi:"+ex.getMessage() +".\nNguyên nhân: "+ex.getCause()), HttpStatus.OK);
        }
        if(orders.isEmpty()){
            logger.warn("There are no orders.");
            logger.info("[API-Cart] getAllOrderRequest - END");
            return new ResponseEntity<>(new CustomErrorType("Không có đơn hàng nào."), HttpStatus.OK);
        }
        logger.info("[API-Cart] getAllOrderRequest - SUCCESS");
        return new ResponseEntity<>(new ResData<>(0, orderDtos), HttpStatus.OK);
    }//view all posts
}
