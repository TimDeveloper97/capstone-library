package com.sb.brothers.capstone.entities;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the manager_post database table.
 * 
 */
@Entity
@Table(name="manager_post")
@NamedQuery(name="ManagerPost.findAll", query="SELECT m FROM ManagerPost m")
public class ManagerPost implements Serializable {
	private static final long serialVersionUID = 1L;
	private int id;
	private String content;
	private Post post;
	private User user;

	public ManagerPost() {
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Lob
	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}


	//bi-directional many-to-one association to Post
	@ManyToOne(fetch=FetchType.LAZY)
	public Post getPost() {
		return this.post;
	}

	public void setPost(Post post) {
		this.post = post;
	}


	//bi-directional many-to-one association to User
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="manager_id")
	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}