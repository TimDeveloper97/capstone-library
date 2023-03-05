package com.sb.brothers.capstone.dto;

import com.sb.brothers.capstone.entities.Category;
import lombok.Data;

@Data
public class CategoryDTO {
    private String name;
    private String nameCode;

    public void convertCategory(Category category){
        category.setNameCode(nameCode);
        category.setName(name);
    }
}
