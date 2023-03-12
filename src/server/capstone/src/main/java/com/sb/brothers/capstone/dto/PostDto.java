package com.sb.brothers.capstone.dto;

import com.sb.brothers.capstone.entities.Post;
import lombok.Data;

import java.util.Date;

@Data
public class PostDto {
    private int id;
    private String title;
    private String address;
    private String content;
    private Date createdDate;
    private Date modifiedDate;
    //private String modifiedBy;
    private int status;
    private String manager;
    private String user;


    public void convertPost(Post post){
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.createdDate = post.getCreatedDate();
        this.modifiedDate = post.getModifiedDate();
        //this.modifiedBy = post.getModifiedBy();
        this.status = post.getStatus();
        this.manager = post.getManager().getId();
        this.user = post.getUser().getId();
        this.address = post.getAddress();
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
    }
}
