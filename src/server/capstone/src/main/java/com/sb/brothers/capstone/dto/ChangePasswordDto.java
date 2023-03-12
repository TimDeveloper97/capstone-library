package com.sb.brothers.capstone.dto;

import lombok.Data;

@Data
public class ChangePasswordDto {

    private String oldPass;

    private String newPass;
}
