package com.sb.brothers.capstone.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Set;


/**
 * The persistent class for the book database table.
 * 
 */
@Entity
@NamedQuery(name="Book.findAll", query="SELECT b FROM Book b")
@Table(name = "books")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Book implements Serializable {
	private static final long serialVersionUID = 1L;
	private int id;
	private String author;
	private String publisher;
	private String description;
	private Integer publishYear;
	private String name;
	private double price;
	private int quantity;
	private Set<Image> images;
	private Set<Category> categories;
	private User user;

	public Book() {
	}


	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}


	public String getAuthor() {
		return this.author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}


	@Column(name="publisher")
	public String getPublisher() {
		return this.publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	@Column(name = "description", nullable = true, length = -1)
	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}


	@Column(name="publish_year", columnDefinition = "integer default 1925")
	public Integer getPublishYear() {
		return this.publishYear;
	}

	public void setPublishYear(Integer publisher) {
		this.publishYear = publisher;
	}


	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}


	public double getPrice() {
		return this.price;
	}

	public void setPrice(double price) {
		this.price = price;
	}


	public int getQuantity() {
		return this.quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	//bi-directional many-to-one association to Image
	@OneToMany(mappedBy="book", fetch = FetchType.LAZY)
	public Set<Image> getImages() {
		return this.images;
	}

	public void setImages(Set<Image> images) {
		this.images = images;
	}

	public Image addImage(Image image) {
		getImages().add(image);
		image.setBook(this);

		return image;
	}

	public Image removeImage(Image image) {
		getImages().remove(image);
		image.setBook(null);

		return image;
	}


	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
			name="book_category"
			, joinColumns={
			@JoinColumn(name="book_id")
	}
			, inverseJoinColumns={
			@JoinColumn(name="category_id")
	}
	)
	@JsonManagedReference
	public Set<Category> getCategories() {
		return categories;
	}

	public void setCategories(Set<Category> categories) {
		this.categories = categories;
	}

	@ManyToOne(fetch=FetchType.LAZY)
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}