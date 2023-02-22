package com.sb.brothers.capstone.dto;

import lombok.Data;


@Data
public class BookDTO {
    private int id;

    private String name;

    private String categoryId;

    private double price;

    private String description;

    private String imageName;

}
