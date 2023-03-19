package com.sb.brothers.capstone.entities;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * The primary key class for the post database table.
 * 
 */
@Entity
@Table(name="post_detail")
@NamedQuery(name="PostDetail.findAll", query="SELECT o FROM PostDetail o")
public class PostDetail implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;
	private int id;
	private Book book;
	private Post post;
	private int sublet;
	private int quantity;

	public PostDetail() {
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	//bi-directional many-to-one association to Book
	//@Id
	@ManyToOne(fetch=FetchType.LAZY)
	public Book getBook() {
		return this.book;
	}

	public void setBook(Book book) {
		this.book = book;
	}


	//bi-directional many-to-one association to Order
	//@Id
	@ManyToOne(fetch=FetchType.LAZY)
	@NotNull
	public Post getPost() {
		return this.post;
	}

	public void setPost(Post post) {
		this.post = post;
	}

	public int getSublet() {
		return sublet;
	}

	public void setSublet(int sublet) {
		this.sublet = sublet;
	}

	@Column(name="quantity", columnDefinition = "integer default 1")
	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}