package com.sb.brothers.capstone.dto;

import lombok.Data;

import java.util.Date;

@Data
public class RentDto {
    private int id;
    private Date borrowedDate;
    private int noDays;
    private String description;
    private int discount;
    private double totalPrice;
    private int userId;
    private int postId;
}
