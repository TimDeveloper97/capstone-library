package com.sb.brothers.capstone.dto;

import com.sb.brothers.capstone.entities.Book;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class BookPostDto {

    private int id;

    private String name;

    private int price;

    private String description;


    private int quantity;

    private List<ImageDto> imgs;

    private List<String> categories;

    public void convertBook(Book book) {
        this.id = book.getId();
        this.name = book.getName();
        this.price = book.getPrice();
        this.description = book.getDescription();
        this.quantity = book.getQuantity();
        this.imgs = new ArrayList<>();
        this.categories = new ArrayList<>();
        book.getImages().stream().forEach(img -> imgs.add(new ImageDto(img.getId(), img.getLink(), null)));
        book.getCategories().stream().forEach(category ->{
            categories.add(category.getName());
        });
    }
}

