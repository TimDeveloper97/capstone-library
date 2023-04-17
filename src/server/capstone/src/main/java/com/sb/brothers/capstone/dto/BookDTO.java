package com.sb.brothers.capstone.dto;

import com.sb.brothers.capstone.configuration.BeanClass;
import com.sb.brothers.capstone.entities.Book;
import com.sb.brothers.capstone.entities.Category;
import com.sb.brothers.capstone.entities.Order;
import com.sb.brothers.capstone.entities.PostDetail;
import com.sb.brothers.capstone.services.CategoryService;
import com.sb.brothers.capstone.services.OrderService;
import com.sb.brothers.capstone.services.PostDetailService;
import com.sb.brothers.capstone.services.PostService;
import com.sb.brothers.capstone.util.CustomStatus;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Data
public class BookDTO {

    private static CategoryService categoryService = BeanClass.getBean(CategoryService.class);

    private static PostDetailService postDetailService = BeanClass.getBean(PostDetailService.class);

    private static OrderService orderService = BeanClass.getBean(OrderService.class);

    private static PostService postService = BeanClass.getBean(PostService.class);

    private int id;

    private String name;

    private int price;

    private String description;

    private String publisher;

    private int publishYear;

    private List<String> categories;

    private int quantity;

    private String author;

    private List<ImageDto> imgs;

    private int percent;

    private int inStock;

    private String owner;

    private List<BookInfoDto> bookInfoDtos;

    private int status;

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
        this.percent = book.getPercent();
        this.inStock = book.getInStock();
        if(book.getUser() != null){
            this.owner = book.getUser().getId();
        }
        this.status = 0;
        book.getImages().stream().forEach(img -> imgs.add(new ImageDto(img.getId(), img.getLink(), null)));
        this.bookInfoDtos = new ArrayList<>();
        if(book.getUser().checkManager() == false && book.getInStock() > 0){
            PostDetail postDeposit = postDetailService.findByBookId(book.getId());
            this.status = 16;
            if(postDeposit != null && postDeposit.getPost().getStatus() == CustomStatus.USER_POST_IS_EXPIRED){
                this.status = 512;
                BookInfoDto bookInfoDto = new BookInfoDto();
                bookInfoDto.setStatus(CustomStatus.USER_POST_IS_EXPIRED);
                bookInfoDtos.add(bookInfoDto);
                return;
            }
        }
        List<PostDetail> postDetails = postDetailService.findPostDetailByBookAndStatus(book.getId());
        if(postDetails != null) {
            postDetails.stream().forEach(postDetail -> {
                BookInfoDto bookInfoDto = new BookInfoDto();
                bookInfoDto.setQuantity(postDetail.getQuantity());
                Order order = orderService.findByPostId(postDetail.getPost().getId()).get();
                bookInfoDto.setRenterId(order.getUser().getId());
                bookInfoDto.setRenter(order.getUser().getFirstName() + " " + order.getUser().getLastName());
                bookInfoDto.setStatus(order.getPost().getStatus());
                bookInfoDtos.add(bookInfoDto);
            });
        }
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
        book.setPercent(this.percent);
        book.setInStock(this.inStock);
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
