package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.configuration.jwt.TokenProvider;
import com.sb.brothers.capstone.dto.OrderDto;
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

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private RoleService roleService;

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

    //posts session
    //@PreAuthorize("hasAnyRole('ROLE_USER')")
    @GetMapping("/has-book/{bookId}")
    public ResponseEntity<?> getAllPostByBookId(@PathVariable int bookId){
        logger.info("Return all posts contain book");
        List<Post> posts = null;
        try{
            posts = postService.getAllPostHasBookId(bookId);
        }catch (Exception ex){
            logger.info("Exception:" + ex.getMessage() +".\n" + ex.getCause());
            return new ResponseEntity<>(new CustomErrorType("Get all posts has book id with exception. No content to return."), HttpStatus.OK);
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
        if(tokenProvider.getRoles(auth).contains("ROLE_ADMIN"))
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
                setPostDetail(auth, postDto, p);
            }
            else{
                logger.warn("Unable to create new post. User has been blocked from posting.");
                return new ResponseEntity(new CustomErrorType("Unable to create new post. User has been blocked from posting."), HttpStatus.OK);
            }
        }
        catch (Exception ex){
            logger.error("Exception: " + ex.getMessage()+".\n" + ex.getCause());
            return new ResponseEntity(new CustomErrorType(ex.getMessage()), HttpStatus.OK);
        }
        logger.info("Create new post - SUCCESS");
        return new ResponseEntity(new CustomErrorType(true,"Create new post - SUCCESS."), HttpStatus.CREATED);
    }//form add new post > do add

    @PreAuthorize("hasRole('ROLE_USER')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePost(Authentication auth, @PathVariable("id") int id){
        logger.info("Fetching & Deleting post with id" + id);
        try{
            Post post = postService.getPostById(id).get();
            if(post == null){
                logger.error("Post with id:"+ id +" not found. Unable to delete.");
                return new ResponseEntity(new CustomErrorType("Post with id:"+ id +" not found. Unable to delete."),
                        HttpStatus.OK);
            }
            if(post.getUser().getId().equals(auth.getName()) || tokenProvider.getRoles(auth).contains("ROLE_ADMIN")) {
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
    public ResponseEntity<?> updatePost(Authentication auth, @RequestBody PostDto postDto) throws Exception {
        if(auth.getName() == postDto.getUser()){
            return new ResponseEntity<>(new CustomErrorType("Request user not correct."), HttpStatus.UNAUTHORIZED);
        }
        if(postDto.getId() != 0) {
            Post currPost = postService.getPostById(postDto.getId()).get();
            if (currPost == null) {
                logger.error("Post with id:" + postDto.getId() + " not found. Unable to update.");
                return new ResponseEntity(new CustomErrorType("Post with id:" + postDto.getId() + " not found. Unable to update."),
                        HttpStatus.NOT_FOUND);
            }
            logger.info("Fetching & Updating Post with id: " + postDto.getId());
            try{
                postDto.convertPostDto(currPost);
                currPost.setModifiedDate(new Date());
                postService.updatePost(currPost);
                postDetailService.deleteAllByPostId(postDto.getId());
                setPostDetail(auth, postDto, currPost);
            }
            catch (Exception ex){
                logger.error("Exception: " + ex.getMessage()+".\n" + ex.getCause());
            }
            logger.info("Update post with post id:"+ postDto.getId() +" - SUCCESS.");
            return new ResponseEntity<>(new CustomErrorType(true, "Update post with post id:"+ postDto.getId() +" - SUCCESS."), HttpStatus.OK);
        }
        return new ResponseEntity<>(new CustomErrorType("Request data not correct."), HttpStatus.OK);
    }//form edit post, fill old data into form

    public void setPostDetail(Authentication auth, PostDto postDto, Post currPost) throws Exception {
        for (PostDetailDto pdDto : postDto.getPostDetailDtos()) {
            PostDetail postDetail = new PostDetail();
            postDetail.setPost(currPost);
            Book book = bookService.getBookById(pdDto.getBookDto().getId()).get();
            Book b = new Book(book);
            if(book == null){
                throw new Exception("Book with id:" + pdDto.getBookDto().getId() + " not found.");
            }
            if(book.getUser().getId().compareTo(auth.getName()) == 0 || book.getInStock() > 0){
                postDetail.setBook(book);
                postDetail.setSublet(0);
                postDetail.setQuantity(pdDto.getQuantity());
                if(currPost.getStatus() == CustomStatus.USER_POST_IS_NOT_APPROVED) {
                    book.setQuantity(book.getQuantity() - postDetail.getQuantity());
                    b.setPercent(postDto.getFee());
                    b.setQuantity(0);
                    b.setInStock(postDetail.getQuantity());
                    bookService.updateBook(b);
                    bookService.updateBook(book);
                }
                else if(currPost.getStatus() == CustomStatus.ADMIN_POST){
                    //@TODO - check qua han
                    if(checkBookNotExpired(book, postDto) == false){
                        throw new Exception("The number of rental days exceeds the number of book deposit days.");
                    }
                    book.setInStock(book.getInStock() - postDetail.getQuantity());
                    bookService.updateBook(book);
                }
                postDetailService.save(postDetail);
            }
            else throw new Exception("User: " + auth.getName() +" does not own this book.");
        }
    }

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
            if(status == CustomStatus.USER_POST_IS_APPROVED) {
                List<PostDetail> postDetailList = postDetailService.findAllByPostId(id);
                for (PostDetail pd : postDetailList) {
                    if (pd.getQuantity() > pd.getBook().getQuantity()) {
                        return new ResponseEntity(new CustomErrorType("The quantity of book in this post not enough."), HttpStatus.OK);
                    }
                   /* Book book = pd.getBook();
                    User bookOwner = book.getUser();
                    List<Role> roles = roleService.getAllByUserId(bookOwner.getId());
                    boolean checkAdmin = false;
                    for(Role role : roles) {
                        if(role.getName().compareTo("ROLE_ADMIN") == 0){
                            checkAdmin = true;
                        }
                    }
                    if(checkAdmin) {
                        book.setPercent(currPost.getFee());
                        bookService.updateBook(book);
                    }*/
                }
            }
            if (currPost.getStatus() == status){
                return new ResponseEntity<>(new CustomErrorType("Post status has been no change."), HttpStatus.OK);
            }
            else postService.updateStatus(id , status);
        }
        catch (Exception ex){
            logger.warn("Exception: " + ex.getMessage() + (ex.getCause() != null ? ". " + ex.getCause() : "" ));
            return new ResponseEntity(new CustomErrorType(ex.getMessage() +".\n" + ex.getCause()), HttpStatus.OK);
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

    boolean checkBookNotExpired(Book book, PostDto p){
        User owner = book.getUser();
        for(Role role : owner.getRoles()){
            if(role.getName().compareTo("ROLE_ADMIN") == 0){
                return true;
            }
        }
        long expiredTime = new Date().getTime() + p.getNoDays();
        long rentTime = new Date().getTime() + OrderDto.milisecondsPerDay*p.getNoDays();
        if(rentTime > expiredTime){
            return false;
        }
        return true;
    }
}
