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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/admin/categories")
@RestController
public class CategoryController {
    public static final Logger logger = Logger.getLogger(CategoryController.class);

    @Autowired
    private CategoryService categoryService;

    //Categories session
    @GetMapping("")
    public ResponseEntity<?> getAllCategories(){
        logger.info("[API-Category] getAllCategories - START");
        logger.info("Return all categories");
        List<Category> categories = categoryService.getAllCategory();
        if(categories.isEmpty()){
            logger.warn("no content");
            logger.info("[API-Category] getAllCategories - END");
            return new ResponseEntity(new CustomErrorType("Thể loại sách trống."), HttpStatus.OK);
        }
        logger.info("[API-Category] getAllCategories - SUCCESS");
        return new ResponseEntity<>(new ResData<List<Category>>(0, categories), HttpStatus.OK);
    }//view all categories

    @PostMapping("/add")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_MANAGER_POST')")
    public ResponseEntity<?> postCatAdd(@RequestBody CategoryDTO categoryDto){
        logger.info("[API-Category] postCatAdd - START");
        logger.info("Creating new category:" + categoryDto.getNameCode());
        if(categoryService.isCategoryExist(categoryDto.getNameCode())){
            logger.error("Unable to create. A Category with name:"
                   + categoryDto.getNameCode() + " already exist.");
            logger.info("[API-Category] postCatAdd - END");
            return new ResponseEntity(new CustomErrorType("Thêm mới thể loại sách không thành công do thể loại sách "
                    + categoryDto.getNameCode()+ " đã tồn tại."), HttpStatus.OK);
        }
        Category category = new Category();
        categoryDto.convertCategory(category);
        categoryService.updateCategory(category);
        logger.info("[API-Category] postCatAdd - SUCCESS");
        return new ResponseEntity(new CustomErrorType(true, "Thêm thể loại sách thành công."), HttpStatus.OK);

    }//form add new category > do add

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER_POST')")
    public ResponseEntity<?> deleteCat(@PathVariable("id") String id){
        logger.info("[API-Category] deleteCat - START");
        logger.info("Fetching & Deleting Category with name code " + id);
        if(!categoryService.isCategoryExist(id)){
            logger.error("Category with name code: "+ id +" not found. Unable to delete.");
            logger.info("[API-Category] deleteCat - END");
            return new ResponseEntity(new CustomErrorType("Thể loại sách có mã: "+ id +" không tồn tại. Xóa thể loại không thành công."), HttpStatus.OK);
        }
        try {
            categoryService.removeCategoryById(id);
        }catch (Exception ex){
            return new ResponseEntity(new CustomErrorType("Tồn tại các cuốn sách thuộc thể loại này. Xóa thể loại không thành công."), HttpStatus.OK);
        }
        logger.info("[API-Category] deleteCat - SUCCESS");
        return new ResponseEntity(new CustomErrorType(true, "Xóa thể loại có mã:" + id + " - thành công."), HttpStatus.OK);
    }//delete 1 category

    @PutMapping("/update/{id}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_MANAGER_POST')")
    public ResponseEntity<?> updateCat(@PathVariable("id") String id, @RequestBody CategoryDTO category){
        logger.info("[API-Category] updateCat - START");
        logger.info("Fetching & Updating category with id: " + id);
        Category currCategory = categoryService.getCategoryById(id).get();
        if(currCategory == null){
            logger.error("Category with id:"+ id +" not found. Unable to update.");
            logger.info("[API-Category] updateCat - END");
            return new ResponseEntity(new CustomErrorType("Thể loại sách có mã: "+ id +" không tìm thấy. Cập nhật không thành công."),
                    HttpStatus.OK);
        }
        currCategory.setName(category.getName());
        //currCategory.setNameCode(category.getNameCode());
        categoryService.updateCategory(currCategory);
        logger.info("[API-Category] updateCat - SUCCESS");
        return new ResponseEntity(new CustomErrorType("Cập nhật thể loại sách thành công."),
                HttpStatus.OK);
    }//form edit category, fill old data into form

}
