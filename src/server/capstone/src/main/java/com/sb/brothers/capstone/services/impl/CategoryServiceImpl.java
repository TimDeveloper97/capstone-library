package com.sb.brothers.capstone.services.impl;

import com.sb.brothers.capstone.entities.Category;
import com.sb.brothers.capstone.repositories.CategoryRepository;
import com.sb.brothers.capstone.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Component
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    public List<Category> getAllCategory(){
        return categoryRepository.findAll();
    }//findAll

    public void updateCategory(Category category){
    	categoryRepository.save(category);
    }//add or update (tuy vao pri-key)

    public void removeCategoryById(String id){
        categoryRepository.deleteById(id);
    }//delete truyen vao pri-key

    public Optional<Category> getCategoryById(String id){
        return categoryRepository.findById(id);
    }//search theo id

    @Override
    public boolean isCategoryExist(String nameCode) {
        return categoryRepository.existsById(nameCode);
    }

    @Override
    public Set<Category> getAllCategoriesByBookId(int id) {
        return categoryRepository.findAllCategoriesByBookId(id);
    }

}
