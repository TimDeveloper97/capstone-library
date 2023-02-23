package com.sb.brothers.capstone.entities;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the post database table.
 * 
 */
@Embeddable
public class PostPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;
	private String userId;
	private String managerId;

	public PostPK() {
	}

	@Column(name="user_id", insertable=false, updatable=false)
	public String getUserId() {
		return this.userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}

	@Column(name="manager_id", insertable=false, updatable=false)
	public String getManagerId() {
		return this.managerId;
	}
	public void setManagerId(String managerId) {
		this.managerId = managerId;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof PostPK)) {
			return false;
		}
		PostPK castOther = (PostPK)other;
		return 
			this.userId.equals(castOther.userId)
			&& this.managerId.equals(castOther.managerId);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.userId.hashCode();
		hash = hash * prime + this.managerId.hashCode();
		
		return hash;
	}
}