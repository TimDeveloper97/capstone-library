package com.sb.brothers.capstone.dto;

import com.sb.brothers.capstone.entities.User;
import lombok.Data;

@Data
public class ManagerDto {
    private String id;
    private String address;

    public ManagerDto(User user){
        this.id = user.getId();
        this.address = user.getAddress();
    }
}
