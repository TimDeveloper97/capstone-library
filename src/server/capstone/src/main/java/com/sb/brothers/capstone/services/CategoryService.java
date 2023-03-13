package com.sb.brothers.capstone.services;


import com.sb.brothers.capstone.entities.Category;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public interface CategoryService {

    List<Category> getAllCategory();

    void updateCategory(Category category);

    void removeCategoryById(String id);

    Optional<Category> getCategoryById(String id);

    boolean isCategoryExist(String nameCode);

    Set<Category> getAllCategoriesByBookId(int id);
}
