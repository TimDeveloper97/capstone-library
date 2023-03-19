package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.dto.PostDetailDto;
import com.sb.brothers.capstone.dto.PostDto;
import com.sb.brothers.capstone.entities.*;
import com.sb.brothers.capstone.services.*;
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
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    public static final Logger logger = Logger.getLogger(PostController.class);

    @Autowired
    private PostService postService;

    @Autowired
    private UserService userService;

    @Autowired
    private PostManagerService postManagerService;

    @Autowired
    private BookService bookService;

    @Autowired
    private PostDetailService postDetailService;

    //posts session
    @GetMapping("")
    public ResponseEntity<?> getAllAdminPosts(){
        logger.info("Return all admin posts");
        List<Post> posts = null;
        try{
            posts = postService.getAllPosts();
        }catch (Exception ex){
            logger.info("Exception:" + ex.getMessage() +".\n" + ex.getCause());
            return new ResponseEntity<>(new CustomErrorType("Get all posts with exception. No content to return."), HttpStatus.OK);
        }
        if(posts.isEmpty()){
            logger.warn("There are no posts.");
            return new ResponseEntity<>(new CustomErrorType("There are no posts."), HttpStatus.OK);
        }
        return getResponseEntity(posts);
    }//view all posts

    public ResponseEntity<?> getResponseEntity(List<Post> posts) {
        List<PostDto> postDtos = new ArrayList<>();
        for (Post p: posts) {
            PostDto postDto = new PostDto();
            postDto.convertPost(p);
            postDtos.add(postDto);
        }
        logger.info("Return all posts - SUCCESS.");
        return new ResponseEntity<>(new ResData<List<PostDto>>(0, postDtos), HttpStatus.OK);
    }

    //posts session
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER_POST')")
    @GetMapping("/request")
    public ResponseEntity<?> getAllUserPosts(){
        logger.info("Return all user posts");
        List<Post> posts = null;
        try{
            posts = postService.getAllPostsByStatus(CustomStatus.USER_POST_IS_NOT_APPROVED);
        }catch (Exception ex){
            logger.info("Exception:" + ex.getMessage() +".\n" + ex.getCause());
            return new ResponseEntity<>(new CustomErrorType("Get all user posts with exception. No content to return."), HttpStatus.OK);
        }
        if(posts.isEmpty()){
            logger.warn("There are no posts.");
            return new ResponseEntity<>(new CustomErrorType("There are no posts."), HttpStatus.OK);
        }
        return getResponseEntity(posts);
    }//view all posts

    @GetMapping("/me")
    public ResponseEntity<?> getPostByUserId(Authentication auth){
        logger.info("Return the all posts of user: " + auth.getName());
        List<Post> posts = null;
        try{
            posts = postService.getAllPostsByUserId(auth.getName());
        } catch (Exception ex){
            logger.error("Exception: " + ex.getMessage()+".\n" + ex.getCause());
            return new ResponseEntity(new CustomErrorType("Exception: " + ex.getMessage()+".\n" + ex.getCause()), HttpStatus.CONFLICT);
        }
        if(posts.isEmpty()){
            logger.warn("There are no posts.");
            return new ResponseEntity<>(new CustomErrorType("User has no posts."), HttpStatus.OK);
        }
        return getResponseEntity(posts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(Authentication auth, @PathVariable("id") int id){
        logger.info("Return the single post");
        if(!postService.isPostExist(id)){
            logger.error("Post with id: " + id + " not found.");
            return new ResponseEntity(new CustomErrorType("Unable to get. A Post with id:"
                    + id +" not exist."),HttpStatus.OK);
        }
        Post post = null;
        try{
            post = postService.getPostById(id).get();
            String user = userService.getUserByPostId(id).get();
            if(post.getStatus() != CustomStatus.ADMIN_POST && !user.equals(auth.getName())){
                throw new Exception("User is not user posted.");
            }
        } catch (Exception ex){
            logger.error("Exception: " + ex.getMessage());
            return new ResponseEntity(new CustomErrorType("Exception: " + ex.getMessage()), HttpStatus.CONFLICT);
        }
        PostDto postDto = new PostDto();
        postDto.convertPost(post);
        logger.info("Return the single post with id: "+ id +" - SUCCESS.");
        return new ResponseEntity<>(new ResData<PostDto>(0, postDto), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostMapping("/add")
    public ResponseEntity<?> createNewPost(Authentication auth, @RequestBody PostDto postDto) {
        if(auth.getAuthorities().contains("ROLE_ADMIN"))
            postDto.setStatus(CustomStatus.ADMIN_POST);
        else postDto.setStatus(CustomStatus.USER_POST_IS_NOT_APPROVED);
        try{
            User user = userService.getUserById(auth.getName()).get();
            if((user.getStatus()&CustomStatus.BLOCK_POST) == 0){
                Post p = new Post();
                postDto.convertPostDto(p);
                p.setUser(user);
                p.setCreatedDate(new Date());
                postService.updatePost(p);

                for (PostDetailDto pdDto : postDto.getPostDetailDtos()) {
                    PostDetail postDetail = new PostDetail();
                    postDetail.setPost(p);
                    Book book = bookService.getBookById(pdDto.getBookDto().getId()).get();
                    if(book.getUser().getId().equals(auth.getName())){
                        postDetail.setBook(book);
                        postDetail.setSublet(0);
                        postDetail.setQuantity(pdDto.getQuantity());
                        //postDetail.setFee(pdDto.getFee());
                        postDetailService.save(postDetail);
                    }
                    else throw new Exception("User: " + auth.getName() +" does not own this book.");
                }
            }
            else{
                logger.warn("Unable to create new post. User has been blocked from posting.");
                return new ResponseEntity(new CustomErrorType("Unable to create new post. User has been blocked from posting."), HttpStatus.OK);
            }
        }
        catch (Exception ex){
            logger.error("Exception: " + ex.getMessage()+".\n" + ex.getCause());
            return new ResponseEntity(new CustomErrorType("Unable to create new post. User not found."), HttpStatus.OK);
        }
        logger.info("Create new post - SUCCESS");
        return new ResponseEntity(new CustomErrorType(true,"Create new post - SUCCESS."), HttpStatus.CREATED);
    }//form add new post > do add

    @PreAuthorize("hasRole('ROLE_USER')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(Authentication auth, @PathVariable("id") int id){
        logger.info("Fetching & Deleting post with id" + id);
        try{
            Post post = postService.getPostById(id).get();
            if(post == null){
                logger.error("Post with id:"+ id +" not found. Unable to delete.");
                return new ResponseEntity(new CustomErrorType("Post with id:"+ id +" not found. Unable to delete."),
                        HttpStatus.OK);
            }
            if(post.getUser().getId().equals(auth.getName()) || auth.getAuthorities().contains("ROLE_MANAGER_POST")) {
                postService.removePostById(id);
            }
            else throw new Exception("The user is not a posted user or a posting manage.");
        } catch (Exception ex){
            logger.error("Exception: " + ex.getMessage()+".\n" + ex.getCause());
            return new ResponseEntity(new CustomErrorType("Exception: " + ex.getMessage()+".\n" + ex.getCause()),
                    HttpStatus.OK);
        }
        logger.info("Delete post with id:" + id +" - SUCCESS");
        return new ResponseEntity(new CustomErrorType(true,"Delete post with id:"+ id+" - SUCCESS."), HttpStatus.OK);
    }//delete 1 post


    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/update")
    public ResponseEntity<?> updatePost(Authentication auth, @RequestBody PostDto postDto){
        if(auth.getName().equals(postDto.getUser())){
            return new ResponseEntity<>(new CustomErrorType("Request user not correct."), HttpStatus.UNAUTHORIZED);
        }
        if(postDto.getId() != 0) {
            Post currPost = postService.getPostById(postDto.getId()).get();
            if (currPost == null) {
                logger.error("Post with id:" + postDto.getId() + " not found. Unable to update.");
                return new ResponseEntity(new CustomErrorType("Post with id:" + postDto.getId() + " not found. Unable to update."),
                        HttpStatus.NOT_FOUND);
            }
            currPost.setContent(postDto.getContent());
            currPost.setModifiedDate(new Date());
            currPost.setStatus(postDto.getStatus());   //show/hide or delete post
            currPost.setTitle(postDto.getTitle());
            currPost.setAddress(postDto.getAddress());
            logger.info("Fetching & Updating Post with id: " + postDto.getId());
            try{
                postService.updatePost(currPost);
            }
            catch (Exception ex){
                logger.error("Exception: " + ex.getMessage()+".\n" + ex.getCause());
            }
            logger.info("Update post with post id:"+ postDto.getId() +" - SUCCESS.");
            return new ResponseEntity<>(new CustomErrorType(true, "Update post with post id:"+ postDto.getId() +" - SUCCESS."), HttpStatus.OK);
        }
        return new ResponseEntity<>(new CustomErrorType("Request data not correct."), HttpStatus.OK);
    }//form edit post, fill old data into form

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER_POST')")
    @PutMapping("/accept-post/{id}")
    public ResponseEntity<?> acceptPostStatus(Authentication auth, @PathVariable("id") int id){
        return changePostStatus(auth, id, CustomStatus.USER_POST_IS_APPROVED);
    }//form edit post, fill old data into form

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER_POST')")
    @PutMapping("/deny-post/{id}")
    public ResponseEntity<?> denyPost(Authentication auth, @PathVariable("id") int id){
        return changePostStatus(auth, id, CustomStatus.USER_REQUEST_IS_DENY);
    }//form edit post, fill old data into form

    ResponseEntity<?> changePostStatus(Authentication auth, int id, int status){
        Post currPost = null;
        try{
            if(!postService.isPostExist(id)){
                throw new Exception("Post with id:" + id + " not found. Unable to update.");
            }
            currPost = postService.getPostById(id).get();
            if (currPost.getStatus() == status){
                throw new Exception("Post status has been no change.");
            }
        }
        catch (Exception ex){
            logger.warn("Exception: " + ex.getMessage());
            return new ResponseEntity(new CustomErrorType(ex.getMessage()), HttpStatus.OK);
        }
        currPost.setStatus(status);   //set status post
        ManagerPost managerPost = new ManagerPost();
        managerPost.setPost(currPost);
        managerPost.setUser(userService.getUserById(auth.getName()).get());
        managerPost.setContent(auth.getName() + " has changed post status with id is " + id+ "to "+(status == CustomStatus.USER_REQUEST_IS_DENY ? "Deny.": "Accept."));
        //currPost.setManager(userService.getUserById(auth.getName()).get());
        postManagerService.save(managerPost);
        currPost.setModifiedDate(new Date());
        logger.info("Fetching & Change Post status with id: " + id);
        postService.updatePost(currPost);
        logger.info("Change post status with post id:"+ id +" - SUCCESS.");
        return new ResponseEntity<>(new CustomErrorType(true, "Post Status are changed."), HttpStatus.OK);
    }
}
