package com.sb.brothers.capstone.entities;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the message database table.
 * 
 */
//@Embeddable
public class MessagePK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;
	private String userB_id;
	private String userA_id;

	public MessagePK() {
	}

	@Column(insertable=false, updatable=false)
	public String getUserB_id() {
		return this.userB_id;
	}
	public void setUserB_id(String userB_id) {
		this.userB_id = userB_id;
	}

	@Column(insertable=false, updatable=false)
	public String getUserA_id() {
		return this.userA_id;
	}
	public void setUserA_id(String userA_id) {
		this.userA_id = userA_id;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof MessagePK)) {
			return false;
		}
		MessagePK castOther = (MessagePK)other;
		return 
			this.userB_id.equals(castOther.userB_id)
			&& this.userA_id.equals(castOther.userA_id);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.userB_id.hashCode();
		hash = hash * prime + this.userA_id.hashCode();
		
		return hash;
	}
}