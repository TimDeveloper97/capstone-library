package com.sb.brothers.capstone.dto;

import lombok.Data;

@Data
public class BookInfoDto {
    private int quantity;
    private String renterId;
    private String renter;
    private int status;
}
