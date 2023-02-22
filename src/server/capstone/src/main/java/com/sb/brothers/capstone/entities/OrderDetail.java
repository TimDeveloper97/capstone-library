package com.sb.brothers.capstone.entities;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the order_detail database table.
 * 
 */
@Entity
@Table(name="order_detail")
@NamedQuery(name="OrderDetail.findAll", query="SELECT o FROM OrderDetail o")
public class OrderDetail implements Serializable {
	private static final long serialVersionUID = 1L;
	private Date borrowDate;
	private int quantity;
	private Date returnDate;
	private Book book;
	private Order order;

	public OrderDetail() {
	}


	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="borrow_date")
	public Date getBorrowDate() {
		return this.borrowDate;
	}

	public void setBorrowDate(Date borrowDate) {
		this.borrowDate = borrowDate;
	}


	public int getQuantity() {
		return this.quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}


	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="return_date")
	public Date getReturnDate() {
		return this.returnDate;
	}

	public void setReturnDate(Date returnDate) {
		this.returnDate = returnDate;
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
	public Order getOrder() {
		return this.order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

}