package com.sb.brothers.capstone.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;


/**
 * The persistent class for the users database table.
 * 
 */
@Entity
@Table(name="users")
@NamedQuery(name="User.findAll", query="SELECT u FROM User u")
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User implements Serializable {
	private static final long serialVersionUID = 1L;
	private String id;
	private String address;
	private int balance;
	private String email;
	private String firstName;
	private String lastName;

	@JsonIgnore
	private String modifiedBy;
	@JsonIgnore
	private Date modifiedDate;
	private String password;
	private String phone;
	private int status;			//

	@JsonIgnore
	private Set<Message> messages1;

	@JsonIgnore
	private Set<Message> messages2;

	@JsonIgnore
	private Set<Notification> notifications;

	@JsonIgnore
	private Set<Order> orders;

	/*@JsonIgnore
	private Set<Post> posts1;
*/
	@JsonIgnore
	private Set<Post> posts2;

	@JsonIgnore
	private Set<Report> reports;

	private List<Role> roles;

	@JsonIgnore
	private Set<Book> books;


	public User() {
		super();
	}


	public User(User user) {
		super();
		this.id = user.getId();
		this.address = user.getAddress();
		this.balance = user.getBalance();
		this.email = user.getEmail();
		this.firstName = user.getFirstName();
		this.lastName = user.getLastName();
		this.modifiedBy = user.getModifiedBy();
		this.modifiedDate = user.getModifiedDate();
		this.password = user.getPassword();
		this.phone = user.getPhone();
		this.status = user.getStatus();
		this.messages1 = user.getMessages1();
		this.messages2 = user.getMessages2();
		this.notifications = user.getNotifications();
		this.orders = user.getOrders();
		//this.posts1 = user.getPosts1();
		this.posts2 = user.getPosts2();
		this.reports = user.getReports();
		this.roles = user.getRoles();
	}

	@Id
	public String getId() {
		return this.id;
	}

	public void setId(String id) {
		this.id = id;
	}


	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}


	public int getBalance() {
		return this.balance;
	}

	public void setBalance(int balance) {
		this.balance = balance;
	}


	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}


	@Column(name="first_name")
	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	@Column(name="last_name")
	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	@Column(name="modified_by")
	public String getModifiedBy() {
		return this.modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}


	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="modified_date")
	public Date getModifiedDate() {
		return this.modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}


	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}


	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}


	public int getStatus() {
		return this.status;
	}

	public void setStatus(int status) {
		this.status = status;
	}


	//bi-directional many-to-one association to Message
	@OneToMany(mappedBy="user1", fetch = FetchType.LAZY)
	public Set<Message> getMessages1() {
		return this.messages1;
	}

	public void setMessages1(Set<Message> messages1) {
		this.messages1 = messages1;
	}

	public Message addMessages1(Message messages1) {
		getMessages1().add(messages1);
		messages1.setUser1(this);

		return messages1;
	}

	public Message removeMessages1(Message messages1) {
		getMessages1().remove(messages1);
		messages1.setUser1(null);

		return messages1;
	}


	//bi-directional many-to-one association to Message
	@OneToMany(mappedBy="user2", fetch = FetchType.LAZY)
	public Set<Message> getMessages2() {
		return this.messages2;
	}

	public void setMessages2(Set<Message> messages2) {
		this.messages2 = messages2;
	}

	public Message addMessages2(Message messages2) {
		getMessages2().add(messages2);
		messages2.setUser2(this);

		return messages2;
	}

	public Message removeMessages2(Message messages2) {
		getMessages2().remove(messages2);
		messages2.setUser2(null);

		return messages2;
	}


	//bi-directional many-to-one association to Notification
	@OneToMany(mappedBy="user", fetch = FetchType.LAZY)
	public Set<Notification> getNotifications() {
		return this.notifications;
	}

	public void setNotifications(Set<Notification> notifications) {
		this.notifications = notifications;
	}

	public Notification addNotification(Notification notification) {
		getNotifications().add(notification);
		notification.setUser(this);

		return notification;
	}

	public Notification removeNotification(Notification notification) {
		getNotifications().remove(notification);
		notification.setUser(null);

		return notification;
	}


	//bi-directional many-to-one association to Order
	@OneToMany(mappedBy="user", fetch = FetchType.LAZY)
	public Set<Order> getOrders() {
		return this.orders;
	}

	public void setOrders(Set<Order> orders) {
		this.orders = orders;
	}

	public Order addOrder(Order order) {
		getOrders().add(order);
		order.setUser(this);

		return order;
	}

	public Order removeOrder(Order order) {
		getOrders().remove(order);
		order.setUser(null);

		return order;
	}

/*
	//bi-directional many-to-one association to Post
	@OneToMany(mappedBy= "manager", fetch = FetchType.LAZY)
	public Set<Post> getPosts1() {
		return this.posts1;
	}

	public void setPosts1(Set<Post> posts1) {
		this.posts1 = posts1;
	}

	public Post addPosts1(Post posts1) {
		getPosts1().add(posts1);
		posts1.setManager(this);

		return posts1;
	}

	public Post removePosts1(Post posts1) {
		getPosts1().remove(posts1);
		posts1.setManager(null);

		return posts1;
	}
*/


	//bi-directional many-to-one association to Post
	@OneToMany(mappedBy= "user", fetch = FetchType.LAZY)
	public Set<Post> getPosts2() {
		return this.posts2;
	}

	public void setPosts2(Set<Post> posts2) {
		this.posts2 = posts2;
	}

	public Post addPosts2(Post posts2) {
		getPosts2().add(posts2);
		posts2.setUser(this);

		return posts2;
	}

	public Post removePosts2(Post posts2) {
		getPosts2().remove(posts2);
		posts2.setUser(null);

		return posts2;
	}


	//bi-directional many-to-one association to Report
	@OneToMany(mappedBy="user", fetch = FetchType.LAZY)
	public Set<Report> getReports() {
		return this.reports;
	}

	public void setReports(Set<Report> reports) {
		this.reports = reports;
	}

	public Report addReport(Report report) {
		getReports().add(report);
		report.setUser(this);

		return report;
	}

	public Report removeReport(Report report) {
		getReports().remove(report);
		report.setUser(null);

		return report;
	}


	//bi-directional many-to-many association to Role
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
		name="user_role"
		, joinColumns={
			@JoinColumn(name="user_id")
			}
		, inverseJoinColumns={
			@JoinColumn(name="role_id")
			}
		)
	@JsonManagedReference
	public List<Role> getRoles() {
		return this.roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
	}

	@OneToMany(fetch=FetchType.LAZY)
	public Set<Book> getBooks() {
		return books;
	}

	public void setBooks(Set<Book> books) {
		this.books = books;
	}


	public Book addBook(Book book) {
		getBooks().add(book);
		book.setUser(this);
		return book;
	}

	public Book removeBook(Book book) {
		getBooks().remove(book);
		book.setUser(null);
		return book;
	}

	public void lazyLoad(){
		this.setPassword("");
		this.setNotifications(null);
		this.setReports(null);
		this.setOrders(null);
		this.setPosts2(null);
		//this.setPosts1(null);
		this.setMessages1(null);
		this.setMessages2(null);
	}
}