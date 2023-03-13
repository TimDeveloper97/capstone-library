package com.sb.brothers.capstone.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Set;


/**
 * The persistent class for the roles database table.
 * 
 */
@Entity
@Table(name="roles")
@NamedQuery(name="Role.findAll", query="SELECT r FROM Role r")
public class Role implements Serializable {
	private static final long serialVersionUID = 1L;
	private int id;
	private String name;
	private Set<User> users;

	public Role() {
	}


	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}


	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}


	@ManyToMany(mappedBy="roles", fetch = FetchType.LAZY)
	@JsonBackReference
	public Set<User> getUsers() {
		return this.users;
	}
	//bi-directional many-to-many association to User

	public void setUsers(Set<User> users) {
		this.users = users;
	}

}