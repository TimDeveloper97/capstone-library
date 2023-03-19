package com.sb.brothers.capstone.dto;

import lombok.Data;

import java.util.Date;

@Data
public class OrderDto {
    private int id;
    private Date borrowedDate;
    private int noDays;
    private String description;
    private int discount;
    private double totalPrice;
    private String userId;
    private int postId;
}
