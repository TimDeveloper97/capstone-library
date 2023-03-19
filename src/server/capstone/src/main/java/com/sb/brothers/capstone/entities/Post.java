package com.sb.brothers.capstone.entities;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;
import java.util.Set;


/**
 * The persistent class for the post database table.
 * 
 */
@Entity
@NamedQuery(name="Post.findAll", query="SELECT p FROM Post p")
public class Post implements Serializable {
	private static final long serialVersionUID = 1L;
	private int id;
	private String content;
	private Date createdDate;
	//private String modifiedBy;
	private Date modifiedDate;
	private double fee;
	private int status;
	private int noDays;
	private String title;
	private String address;
	private Set<ManagerPost> managerPosts;
	private Set<Order> orders;
	//private User manager;
	private User user;
	private Set<Report> reports;

	public Post() {
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
	@Column(name = "content", nullable = true, length = 512)
	public String getContent() {
		return this.content;
	}

	public void setContent(String content) {
		this.content = content;
	}


	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_date")
	public Date getCreatedDate() {
		return this.createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}


	/*@Column(name="modified_by")
	public String getModifiedBy() {
		return this.modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}
*/

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="modified_date")
	public Date getModifiedDate() {
		return this.modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
	}


	public int getStatus() {
		return this.status;
	}

	public void setStatus(int status) {
		this.status = status;
	}


	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	//bi-directional many-to-one association to ManagerPost
	@OneToMany(mappedBy="post")
	public Set<ManagerPost> getManagerPosts() {
		return this.managerPosts;
	}

	public void setManagerPosts(Set<ManagerPost> managerPosts) {
		this.managerPosts = managerPosts;
	}

	public ManagerPost addManagerPost(ManagerPost managerPost) {
		getManagerPosts().add(managerPost);
		managerPost.setPost(this);

		return managerPost;
	}

	public ManagerPost removeManagerPost(ManagerPost managerPost) {
		getManagerPosts().remove(managerPost);
		managerPost.setPost(null);

		return managerPost;
	}


	//bi-directional many-to-one association to Order
	@OneToMany(mappedBy="post")
	public Set<Order> getOrders() {
		return this.orders;
	}

	public void setOrders(Set<Order> orders) {
		this.orders = orders;
	}

	public Order addOrder(Order order) {
		getOrders().add(order);
		order.setPost(this);

		return order;
	}

	public Order removeOrder(Order order) {
		getOrders().remove(order);
		order.setPost(null);

		return order;
	}

/*

	//bi-directional many-to-one association to User
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="manager_id")
	public User getManager() {
		return this.manager;
	}

	public void setManager(User user1) {
		this.manager = user1;
	}
*/


	//bi-directional many-to-one association to User
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user_id")
	public User getUser() {
		return this.user;
	}

	public void setUser(User user2) {
		this.user = user2;
	}


	//bi-directional many-to-one association to Report
	@OneToMany(mappedBy="post")
	public Set<Report> getReports() {
		return this.reports;
	}

	public void setReports(Set<Report> reports) {
		this.reports = reports;
	}

	public Report addReport(Report report) {
		getReports().add(report);
		report.setPost(this);

		return report;
	}

	public Report removeReport(Report report) {
		getReports().remove(report);
		report.setPost(null);

		return report;
	}

	@Column(name = "no_days", columnDefinition = "integer default 7")
	public int getNoDays() {
		return noDays;
	}

	public void setNoDays(int noDays) {
		this.noDays = noDays;
	}

	public double getFee() {
		return fee;
	}

	public void setFee(double fee) {
		this.fee = fee;
	}
}