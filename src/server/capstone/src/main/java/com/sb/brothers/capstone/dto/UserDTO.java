package com.sb.brothers.capstone.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sb.brothers.capstone.entities.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class UserDTO {
    private String id;
    private String address;
    private int balance;
    private String email;
    private String firstName;
    private String lastName;

    @JsonIgnore
    private String modifiedBy;

    @JsonIgnore
    private Date modifiedDate;
    private String password;
    private String phone;
    private int status;

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
        this.password = "";
        this.phone = user.getPhone();
        this.status = user.getStatus();
        this.roles = new ArrayList<String>();
        user.getRoles().stream().forEach(r -> roles.add(r.getName()));
    }

    /**
     * Convert UserDTO to User Entity
     * @param user
     */
    public void convertUserDto(User user){
        user.setId(this.getId());
        user.setFirstName(this.getFirstName());
        user.setLastName(this.getLastName());
        user.setEmail(this.getEmail());
        user.setAddress(this.getAddress());
        user.setPhone(this.getPhone());
        user.setBalance(this.getBalance());
        user.setStatus(this.getStatus());
    }

}
