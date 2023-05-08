package com.sb.brothers.capstone.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.io.Serializable;
import java.util.Set;
import javax.persistence.*;


/**
 * The persistent class for the image database table.
 * 
 */
@Entity
@NamedQuery(name="Store.findAll", query="SELECT s FROM Store s")
public class Store implements Serializable {
	private static final long serialVersionUID = 1L;
	private int id;
	private String address;
	private Set<User> users;

	public Store() {
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@ManyToMany(mappedBy="stores", fetch = FetchType.LAZY)
	public Set<User> getUsers() {
		return this.users;
	}
	//bi-directional many-to-many association to User

	public void setUsers(Set<User> users) {
		this.users = users;
	}
}