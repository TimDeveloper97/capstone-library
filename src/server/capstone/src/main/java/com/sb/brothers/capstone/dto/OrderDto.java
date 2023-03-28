package com.sb.brothers.capstone.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.sb.brothers.capstone.entities.Order;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class OrderDto {

    public final static long milisecondsPerDay = 1000*60*60*24;

    private int id;
    private Date borrowedDate;
    private int noDays;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String description;
    private int status;
    private int totalPrice;
    private String userId;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<PostDto> orders;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private int postId;

    public OrderDto() {
    }

    public OrderDto(Order order) {
        this.id = order.getId();
        this.borrowedDate = order.getBorrowedDate();
        this.noDays = getNoDays(order.getBorrowedDate(), order.getReturnDate());
        this.description = order.getDescription();
        this.status = order.getPost().getStatus();
        this.totalPrice = order.getTotalPrice();
        this.userId = order.getUser().getId();
        this.postId = order.getPost().getId();
    }

    int getNoDays(Date sDay, Date fDay){
        return (int)((fDay.getTime() - sDay.getTime())/milisecondsPerDay);
    }
}
