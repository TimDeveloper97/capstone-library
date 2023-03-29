package com.sb.brothers.capstone.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sb.brothers.capstone.configuration.BeanClass;
import com.sb.brothers.capstone.entities.Book;
import com.sb.brothers.capstone.entities.Post;
import com.sb.brothers.capstone.entities.PostDetail;
import com.sb.brothers.capstone.services.BookService;
import com.sb.brothers.capstone.services.PostDetailService;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class PostDto {

    @JsonIgnore
    private PostDetailService postDetailService = BeanClass.getBean(PostDetailService.class);

    @JsonIgnore
    private BookService bookService = BeanClass.getBean(BookService.class);

    private int id;
    private String title;
    private String address;
    private String content;
    private Date createdDate;
    private Date modifiedDate;
    //private String modifiedBy;
    private int status;
    private int noDays;
    private int fee;
    //private String manager;
    private String user;
    private List<PostDetailDto> postDetailDtos;


    public void convertPost(Post post){
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.createdDate = post.getCreatedDate();
        this.modifiedDate = post.getModifiedDate();
        //this.modifiedBy = post.getModifiedBy();
        this.status = post.getStatus();
        //this.manager = post.getManager().getId();
        this.user = post.getUser().getId();
        this.address = post.getAddress();
        this.noDays = post.getNoDays();
        this.fee = post.getFee();
        postDetailDtos = new ArrayList<>();
        List<PostDetail> postDetails = postDetailService.findAllByPostId(post.getId());
        for (PostDetail pd: postDetails){
            PostDetailDto detailDto = new PostDetailDto();
            //detailDto.setPostId(pd.getPost().getId());
            Book book = bookService.getBookById(pd.getBook().getId()).get();
            BookPostDto b = new BookPostDto();
            b.convertBook(book);
            detailDto.setBookDto(b);
            //detailDto.setBookId();
            //detailDto.setFee(pd.getFee());
            detailDto.setQuantity(pd.getQuantity());
            postDetailDtos.add(detailDto);
        }
    }

    public void convertPostDto(Post post){
        post.setId(this.id);
        post.setTitle(this.title);
        post.setContent(this.content);
        post.setCreatedDate(this.createdDate);
        post.setModifiedDate(this.modifiedDate);
        //post.setModifiedBy(this.modifiedBy);
        post.setStatus(this.status);
        post.setAddress(this.address);
        post.setNoDays(this.noDays);
        post.setFee(this.fee);
    }
}
