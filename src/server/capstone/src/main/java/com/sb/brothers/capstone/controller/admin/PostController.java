package com.sb.brothers.capstone.controller.admin;

import com.sb.brothers.capstone.dto.PostDto;
import com.sb.brothers.capstone.entities.Post;
import com.sb.brothers.capstone.services.PostService;
import com.sb.brothers.capstone.services.UserService;
import com.sb.brothers.capstone.util.CustomErrorType;
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

    //posts session
    @GetMapping("")
    public ResponseEntity<?> getAllPosts(){
        logger.info("Return all posts");
        List<Post> posts = null;
        try{
            posts = postService.getAllPosts();
        }catch (Exception ex){
            logger.info("Exception:" + ex.getMessage() +".\n" + ex.getCause());
            return new ResponseEntity<>(new CustomErrorType("Get all posts with exception. No content to return."), HttpStatus.NO_CONTENT);
        }
        if(posts.isEmpty()){
            logger.warn("There are no posts.");
            return new ResponseEntity<>(new CustomErrorType("There are no posts."), HttpStatus.NOT_FOUND);
        }
        List<PostDto> postDtos = new ArrayList<>();
        for (Post p: posts) {
            PostDto postDto = new PostDto();
            postDto.convertPost(p);
            postDtos.add(postDto);
        }
        logger.info("Return all posts - SUCCESS.");
        return new ResponseEntity<>(new ResData<List<PostDto>>(0, postDtos), HttpStatus.OK);
    }//view all posts

    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable("id") int id){
        logger.info("Return the single post");
        if(!postService.isPostExist(id)){
            logger.error("Post with id: " + id + " not found.");
            return new ResponseEntity(new CustomErrorType("Unable to get. A Post with id:"
                    + id +" not exist."),HttpStatus.NOT_FOUND);
        }
        Post post = null;
        try{
            post = postService.getPostById(id).get();
        } catch (Exception ex){
            logger.error("Exception: " + ex.getMessage()+".\n" + ex.getCause());
            return new ResponseEntity(new CustomErrorType("Exception: " + ex.getMessage()+".\n" + ex.getCause()), HttpStatus.CONFLICT);
        }
        PostDto postDto = new PostDto();
        postDto.convertPost(post);
        logger.info("Return the single post with id: "+ id +" - SUCCESS.");
        return new ResponseEntity<>(new ResData<PostDto>(0, postDto), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> createNewPost(Authentication auth, @RequestBody PostDto postDto) {
        logger.info("Creating Post:" + postDto.getId());
        if(postService.isPostExist(postDto.getId())){
            logger.error("Unable to create. A post with name:"
                    + postDto.getId() +" already exist.");
            return new ResponseEntity(new CustomErrorType("Unable to create. A Post with name:"
                    + postDto.getId() +" already exist."), HttpStatus.CONFLICT);
        }
        try{
            Post p = new Post();
            postDto.convertPostDto(p);
            p.setManager(null);
            p.setUser(userService.getUserById(postDto.getUser()).get());
            postService.updatePost(p);
        }
        catch (Exception ex){
            logger.error("Exception: " + ex.getMessage()+".\n" + ex.getCause());
            return new ResponseEntity(new CustomErrorType("Unable to create new post. User not found."), HttpStatus.CONFLICT);
        }
        logger.info("Create new post - SUCCESS");
        return new ResponseEntity(new CustomErrorType(true,"Create new post - SUCCESS."), HttpStatus.CREATED);
    }//form add new post > do add

    @GetMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") int id){
        logger.info("Fetching & Deleting post with id" + id);
        if(!postService.isPostExist(id)){
            logger.error("Post with id:"+ id +" not found. Unable to delete.");
            return new ResponseEntity(new CustomErrorType("Post with id:"+ id +" not found. Unable to delete."),
                    HttpStatus.NOT_FOUND);
        }
        try{
            postService.removePostById(id);
        }
            catch (Exception ex){
            logger.error("Exception: " + ex.getMessage()+".\n" + ex.getCause());
        }
        logger.info("Delete post with id:" + id +" - SUCCESS");
        return new ResponseEntity(new CustomErrorType(true,"Delete post with id:"+ id+" - SUCCESS."), HttpStatus.OK);
    }//delete 1 post


    @PreAuthorize("hasRole('ROLE_USER')")
    @PutMapping("/update")
    public ResponseEntity<?> updatePost(Authentication auth, @RequestBody Post post){
        if(auth.getName().equals(post.getUser().getId())){
            return new ResponseEntity<>(new CustomErrorType("Request user not correct."), HttpStatus.UNAUTHORIZED);
        }
        if(post.getId() != 0) {
            Post currPost = postService.getPostById(post.getId()).get();
            if (currPost == null) {
                logger.error("Post with id:" + post.getId() + " not found. Unable to update.");
                return new ResponseEntity(new CustomErrorType("Post with id:" + post.getId() + " not found. Unable to update."),
                        HttpStatus.NOT_FOUND);
            }
            currPost.setContent(post.getContent());
            currPost.setModifiedDate(new Date());
            currPost.setStatus(post.getStatus());   //show/hide or delete post
            currPost.setTitle(post.getTitle());
            logger.info("Fetching & Updating Post with id: " + post.getId());
            try{
                postService.updatePost(currPost);
            }
            catch (Exception ex){
                logger.error("Exception: " + ex.getMessage()+".\n" + ex.getCause());
            }
            logger.info("Update post with post id:"+ post.getId() +" - SUCCESS.");
            return new ResponseEntity<Post>(post, HttpStatus.OK);
        }
        return new ResponseEntity<>(new CustomErrorType("Request data not correct."), HttpStatus.EXPECTATION_FAILED);
    }//form edit post, fill old data into form

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER_POST')")
    @PutMapping("/change")
    public ResponseEntity<?> changePostStatus(Authentication auth, @RequestBody Post post){
        //if(auth.getName().equals(post.getUser().getId()) && post.getStatus() != 0){
            Post currPost = null;
            try{
                if(postService.isPostExist(post.getId())){
                    return new ResponseEntity(new CustomErrorType("Post with id:" + post.getId() + " not found. Unable to update."),
                            HttpStatus.NOT_FOUND);
                }
                currPost = postService.getPostById(post.getId()).get();
            }
            catch (Exception ex){
                logger.error("Exception: " + ex.getMessage()+".\n" + ex.getCause());
                return new ResponseEntity<>(new CustomErrorType("Request data not correct."), HttpStatus.EXPECTATION_FAILED);
            }
            currPost.setStatus(post.getStatus());   //show/hide or delete post
            logger.info("Fetching & Change Post status with id: " + post.getId());
            postService.updatePost(currPost);
            logger.info("Update post with post id:"+ post.getId() +" - SUCCESS.");
            return new ResponseEntity<Post>(post, HttpStatus.OK);
        //}
        //return new ResponseEntity<>(new CustomErrorType("Request user not correct."), HttpStatus.UNAUTHORIZED);
    }//form edit post, fill old data into form

}
