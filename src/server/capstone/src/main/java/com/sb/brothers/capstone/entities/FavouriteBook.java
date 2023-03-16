package com.sb.brothers.capstone.entities;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * The primary key class for the post database table.
 * 
 */
@Entity
@Table(name="favourite_book")
@NamedQuery(name="FavouriteBook.findAll", query="SELECT o FROM FavouriteBook o")
public class FavouriteBook implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;
	private Book book;
	private User user;
	private double rating;

	public FavouriteBook() {
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
	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}
}