package com.sb.brothers.capstone.dto;

import com.sb.brothers.capstone.entities.Payment;
import lombok.Data;

import java.util.Date;

@Data
public class PaymentDto {
    private int id;
    private String content;
    private Date createdDate;
    //private Date modifiedDate;
    //private int status;
    private int transferAmount;
    private String manager;
    private String user;

    public PaymentDto() {
    }

    public void convertPayment(Payment payment) {
        this.id = payment.getId();
        this.content = payment.getContent();
        this.createdDate = payment.getCreatedDate();
        this.transferAmount = payment.getTransferAmount();
        this.manager = payment.getManager().getId();
        this.user = payment.getUser().getId();
    }
}
