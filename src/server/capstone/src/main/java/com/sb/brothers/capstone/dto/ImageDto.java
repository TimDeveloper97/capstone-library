package com.sb.brothers.capstone.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ImageDto {
    private int id;
    private String fileName;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String data;
}
