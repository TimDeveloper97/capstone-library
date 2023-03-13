package com.sb.brothers.capstone.dto;

import com.sb.brothers.capstone.entities.Book;
import com.sb.brothers.capstone.entities.Category;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Data
public class BookDTO {
    private int id;

    private String name;

    private double price;

    private String description;

    private String publisher;

    private int publishYear;

    private List<String> categories;

    private int quantity;

    public void convertBook(Book book){
        this.id = book.getId();
        this.name = book.getName();
        this.price = book.getPrice();
        this.description = book.getDescription();
        this.publisher = book.getPublisher();
        for (Category category:book.getCategories()){
            categories.add(category.getNameCode());
        }
        this.quantity = book.getQuantity();
        this.publishYear = book.getPublishYear();
    }
}
