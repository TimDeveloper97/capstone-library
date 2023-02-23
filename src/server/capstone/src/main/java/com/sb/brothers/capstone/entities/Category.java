package com.sb.brothers.capstone.entities;

import java.io.Serializable;
import java.util.Set;
import javax.persistence.*;


/**
 * The persistent class for the category database table.
 * 
 */
@Entity
@NamedQuery(name="Category.findAll", query="SELECT c FROM Category c")
public class Category implements Serializable {
	private static final long serialVersionUID = 1L;
	private String name;
	private String nameCode;
	private Set<Book> books;

	public Category() {
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Id
	@Column(name="name_code")
	public String getNameCode() {
		return this.nameCode;
	}

	public void setNameCode(String nameCode) {
		this.nameCode = nameCode;
	}

	//bi-directional many-to-many association to User
	@ManyToMany(mappedBy="categories")
	public Set<Book> getUsers() {
		return books;
	}

	public void setUsers(Set<Book> books) {
		this.books = books;
	}
}