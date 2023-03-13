package com.sb.brothers.capstone.entities;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the image database table.
 * 
 */
@Entity
@NamedQuery(name="Image.findAll", query="SELECT i FROM Image i")
public class Image implements Serializable {
	private static final long serialVersionUID = 1L;
	private int id;
	private String link;
	private Book book;

	public Image() {
	}


	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}


	public String getLink() {
		return this.link;
	}

	public void setLink(String link) {
		this.link = link;
	}


	//bi-directional many-to-one association to Book
	@ManyToOne(fetch=FetchType.LAZY)
	public Book getBook() {
		return this.book;
	}

	public void setBook(Book book) {
		this.book = book;
	}

}