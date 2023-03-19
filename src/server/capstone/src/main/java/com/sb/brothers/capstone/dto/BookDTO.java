package com.sb.brothers.capstone.dto;

import com.sb.brothers.capstone.configuration.BeanClass;
import com.sb.brothers.capstone.entities.Book;
import com.sb.brothers.capstone.entities.Category;
import com.sb.brothers.capstone.services.CategoryService;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Data
public class BookDTO {

    private static CategoryService categoryService = BeanClass.getBean(CategoryService.class);

    private int id;

    private String name;

    private double price;

    private String description;

    private String publisher;

    private int publishYear;

    private List<String> categories;

    private int quantity;

    private String author;

    private List<ImageDto> imgs;

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
        book.getImages().stream().forEach(img -> imgs.add(new ImageDto(img.getId(), img.getLink(), null)));
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

    public static List<BookDTO> convertAllBooks(Set<Book> books){
        List<BookDTO> bookDTOS = new ArrayList<>();
        for (Book book : books){
            //book.setCategories(categoryService.getAllCategoriesByBookId(book.getId()));
            BookDTO bDto = new BookDTO();
            bDto.convertBook(book);
            bookDTOS.add(bDto);
        }
        return bookDTOS;
    }
}
