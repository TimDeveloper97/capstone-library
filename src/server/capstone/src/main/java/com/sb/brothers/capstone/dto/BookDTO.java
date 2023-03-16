package com.sb.brothers.capstone.dto;

import com.sb.brothers.capstone.entities.Book;
import com.sb.brothers.capstone.entities.Category;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashSet;
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

    private String author;

    private List<String> imgs;

    public void convertBook(Book book){
        this.id = book.getId();
        this.name = book.getName();
        this.price = book.getPrice();
        this.description = book.getDescription();
        this.publisher = book.getPublisher();
        categories = new ArrayList<>();
        for (Category category:book.getCategories()){
            categories.add(category.getNameCode());
        }
        this.quantity = book.getQuantity();
        this.publishYear = book.getPublishYear();
        this.author = book.getAuthor();
        this.imgs = new ArrayList<>();
        book.getImages().stream().forEach(img -> imgs.add(img.getLink()));
    }

    /**
     * Need set Categories and Imgs
     * @param book
     */
    public void convertBookDto(Book book){
        book.setId(this.id);
        book.setName(this.name);
        book.setPrice(this.price);
        book.setDescription(this.description);
        book.setPublisher(this.publisher);
        book.setQuantity(this.quantity);
        book.setPublishYear(this.publishYear);
        book.setAuthor(this.author);
    }
}
