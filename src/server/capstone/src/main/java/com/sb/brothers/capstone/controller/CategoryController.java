package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.dto.CategoryDTO;
import com.sb.brothers.capstone.entities.Category;
import com.sb.brothers.capstone.services.CategoryService;
import com.sb.brothers.capstone.util.CustomErrorType;
import com.sb.brothers.capstone.util.ResData;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/admin/categories")
@RestController
public class CategoryController {
    public static final Logger logger = Logger.getLogger(CategoryController.class);

    @Autowired
    CategoryService categoryService;

    //Categories session
    @GetMapping("")
    public ResponseEntity<?> getAllCategories(){
        logger.info("Return all categories");
        List<Category> categories = categoryService.getAllCategory();
        if(categories.isEmpty()){
            logger.warn("no content");
            return new ResponseEntity(new CustomErrorType("Thể loại sách trống."), HttpStatus.OK);
        }
        logger.info("Success - Get All categories");
        return new ResponseEntity<>(new ResData<List<Category>>(0, categories), HttpStatus.OK);
    }//view all categories

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> postCatAdd(@RequestBody CategoryDTO categoryDto){
        logger.info("Creating new category:" + categoryDto.getNameCode());
        if(categoryService.isCategoryExist(categoryDto.getNameCode())){
            logger.error("Unable to create. A Category with name:"
                   + categoryDto.getNameCode() + " already exist.");
            return new ResponseEntity(new CustomErrorType("Thêm mới thể loại sách không thành công do thể loại sách "
                    + categoryDto.getNameCode()+ " đã tồn tại."), HttpStatus.OK);
        }
        Category category = new Category();
        categoryDto.convertCategory(category);
        categoryService.updateCategory(category);
        return new ResponseEntity(new CustomErrorType(true, "Thêm thể loại sách thành công."), HttpStatus.CREATED);

    }//form add new category > do add

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteCat(@PathVariable String id){
        logger.info("Fetching & Deleting Category with name code " + id);
        if(!categoryService.isCategoryExist(id)){
            logger.error("Category with name code: "+ id +" not found. Unable to delete.");
            return new ResponseEntity(new CustomErrorType("Thể loại sách có mã: "+ id +" không tồn tại. Xóa thể loại không thành công"), HttpStatus.OK);
        }
        categoryService.removeCategoryById(id);
        logger.info("Delete Category - Success!");
        return new ResponseEntity(new CustomErrorType(true, "Xóa thể loại có mã:" + id + " - SUCCESS."), HttpStatus.OK);
    }//delete 1 category

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateCat(@PathVariable String id, @RequestBody Category category){
        logger.info("Fetching & Updating category with id" + id);
        Category currCategory = categoryService.getCategoryById(id).get();
        if(currCategory == null){
            logger.error("Category with id:"+ id +" not found. Unable to update.");
            return new ResponseEntity(new CustomErrorType("Thể loại sách có mã: "+ id +" không tìm thấy. Cập nhật không thành công."),
                    HttpStatus.NOT_FOUND);
        }
        currCategory.setName(category.getName());
        currCategory.setNameCode(category.getNameCode());
        categoryService.updateCategory(currCategory);
        logger.info("Update category - Success");
        return new ResponseEntity<>(new ResData<Category>(0, currCategory), HttpStatus.OK);
    }//form edit category, fill old data into form

}
