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
	private Book book;
	private Post post;
	private boolean sublet;
	private double fee;
	private int quantity;

	public PostDetail() {
	}


	//bi-directional many-to-one association to Book
	@Id
	@ManyToOne(fetch=FetchType.LAZY)
	public Book getBook() {
		return this.book;
	}

	public void setBook(Book book) {
		this.book = book;
	}


	//bi-directional many-to-one association to Order
	@Id
	@ManyToOne(fetch=FetchType.LAZY)
	@NotNull
	public Post getPost() {
		return this.post;
	}

	public void setPost(Post post) {
		this.post = post;
	}

	public boolean isSublet() {
		return sublet;
	}

	public void setSublet(boolean sublet) {
		this.sublet = sublet;
	}

	public double getFee() {
		return fee;
	}

	public void setFee(double fee) {
		this.fee = fee;
	}

	@Column(name="quantity", columnDefinition = "integer default 1")
	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}