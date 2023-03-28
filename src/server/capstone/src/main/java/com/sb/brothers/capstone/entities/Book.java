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
	private int price;
	private int quantity;
	private int inStock;
	private int percent;
	private Set<Image> images;
	private Set<Category> categories;
	private Set<PostDetail> postDetails;
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

	@Lob
	@Column(name = "description", nullable = true, length = 512)
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


	public int getPrice() {
		return this.price;
	}

	public void setPrice(int price) {
		this.price = price;
	}


	public int getQuantity() {
		return this.quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	//bi-directional many-to-one association to Image
	@OneToMany(mappedBy="book", fetch = FetchType.EAGER)
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

	public int getPercent() {
		return percent;
	}

	public void setPercent(int percent) {
		this.percent = percent;
	}


	@ManyToMany(fetch = FetchType.EAGER)
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

	@ManyToOne(fetch=FetchType.EAGER)
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	//bi-directional many-to-one association to Image
	@OneToMany(mappedBy="book", fetch = FetchType.EAGER)
	public Set<PostDetail> getPostDetails() {
		return this.postDetails;
	}

	public void setPostDetails(Set<PostDetail> postDetails) {
		this.postDetails = postDetails;
	}

	public PostDetail addPostDetail(PostDetail postDetail) {
		getPostDetails().add(postDetail);
		postDetail.setBook(this);

		return postDetail;
	}

	public PostDetail removePostDetail(PostDetail postDetail) {
		getPostDetails().remove(postDetail);
		postDetail.setBook(null);

		return postDetail;
	}

	@Column(name = "in_stock", columnDefinition = "integer default 0")
	public int getInStock() {
		return inStock;
	}

	public void setInStock(int inStock) {
		this.inStock = inStock;
	}

	public Book(Book book) {
		this.author = book.getAuthor();
		this.publisher = book.getPublisher();
		this.description = book.getDescription() + "[Ký gửi]";
		this.publishYear = book.getPublishYear();
		this.name = book.getName();
		this.price = book.getPrice();
		this.quantity = book.getQuantity();
		this.inStock = book.getInStock();
		this.percent = book.getPercent();
		this.images = book.getImages();
		this.categories = book.getCategories();
		this.user = book.getUser();
	}
}