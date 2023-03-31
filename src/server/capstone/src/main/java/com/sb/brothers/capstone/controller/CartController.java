package com.sb.brothers.capstone.controller;

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

    @GetMapping("/cart")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> cartGet(Authentication auth){
        List<PostDto> list = GlobalData.cart.get(auth.getName());
        if(list == null || list.isEmpty()){
            return new ResponseEntity<>(new CustomErrorType("Giỏ hàng trống."), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResData<List<PostDto>>(0,list), HttpStatus.OK);
    }//page cart

    @PutMapping("/order-book/{postId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> addToCart(Authentication auth, @PathVariable("postId") int postId){
        List<PostDto> list = GlobalData.cart.get(auth.getName());
        if(list == null)
            list = new ArrayList<>();
        PostDto postDto = new PostDto();
        Post post = postService.getPostById(postId).get();
        if(post == null || post.getStatus() == CustomStatus.USER_POST_IS_NOT_APPROVED){
            return new ResponseEntity(new CustomErrorType("Không tìm thấy bài đăng có mã: " + postId), HttpStatus.OK);
        }
        for (PostDto pInOrder : list){
            if(pInOrder.getId() == postId){
                return new ResponseEntity(new CustomErrorType("Sản phầm đã có trong giỏ hàng."), HttpStatus.OK);
            }
        }
        postDto.convertPost(post);
        list.add(postDto);
        GlobalData.cart.put(auth.getName(), list);
        return new ResponseEntity(new CustomErrorType(true, "Thêm vào giỏ hàng thành công."), HttpStatus.CREATED);
    }//click add from page viewProduct

    @DeleteMapping("/cart/remove-item/{postId}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> cartItemRemove(Authentication auth, @PathVariable("postId") int postId){
        List<PostDto> list = GlobalData.cart.get(auth.getName());
        if(list != null) {
            try {
                GlobalData.cart.get(auth.getName()).removeIf(n -> (n.getId() == postId));
            }catch (Exception ex){
                logger.error("This item not exists in your cart.");
                return new ResponseEntity<>(new CustomErrorType("Sản phẩm không có trong giỏ hàng."), HttpStatus.OK);
            }
            return new ResponseEntity(new CustomErrorType(true, "Xóa sản phẩm khỏi giỏ hàng thành công."), HttpStatus.OK);
        }
        return new ResponseEntity<>(new CustomErrorType("Giỏ hàng trống."), HttpStatus.OK);
    } // delete 1 product

    //Get All Order session
    @GetMapping("/order/request")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<?> getAllOrderRequest(){
        logger.info("Return all admin posts");
        List<Order> orders = null;
        List<OrderDto> orderDtos = new ArrayList<>();
        try{
            orders = orderService.getOrderByStatus();
            for (Order order: orders){
                OrderDto orderDto = new OrderDto(order);
                orderDtos.add(orderDto);
            }
        }catch (Exception ex){
            logger.info("Exception:" + ex.getMessage() +".\n" + ex.getCause());
            return new ResponseEntity<>(new CustomErrorType("Xảy ra lỗi:"+ex.getMessage() +".\nNguyên nhân: "+ex.getCause()), HttpStatus.OK);
        }
        if(orders.isEmpty()){
            logger.warn("There are no orders.");
            return new ResponseEntity<>(new CustomErrorType("Không có đơn hàng nào."), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResData<>(0, orderDtos), HttpStatus.OK);
    }//view all posts
}
