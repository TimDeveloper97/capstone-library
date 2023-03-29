package com.sb.brothers.capstone.dto;

import com.sb.brothers.capstone.entities.Notification;
import lombok.Data;

import java.util.Date;

@Data
public class NotificationDto{
	private int id;
	private Date createdDate;
	private String description;
	private int status;
	private String  user;

	public NotificationDto() {
	}

	public void convertNotification(Notification notification) {
		this.id = notification.getId();
		this.createdDate = notification.getCreatedDate();
		this.description = notification.getDescription();
		this.status = notification.getStatus();
		this.user = notification.getUser().getId();
	}
}