package com.sb.brothers.capstone.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserDTO {
    private String id;

    private String email;

    private String password;

    private List<String> roleIds;

    private String firstName;

    private String lastName;

}
