package com.sb.brothers.capstone.dto;

import com.sb.brothers.capstone.entities.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class LoginRespDto {
    private String id;
    private String address;
    private int balance;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;

    private List<String> roles;

    /**
     * Convert User Entity to User DTO
     * @param user
     */
    public void convertUser(User user){
        this.id = user.getId();
        this.address = user.getAddress();
        this.balance = user.getBalance();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.phone = user.getPhone();
        this.roles = new ArrayList<String>();
        user.getRoles().stream().forEach(r -> roles.add(r.getName()));
    }

}
