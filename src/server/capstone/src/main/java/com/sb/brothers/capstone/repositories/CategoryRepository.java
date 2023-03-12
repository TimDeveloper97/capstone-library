package com.sb.brothers.capstone.repositories;

import com.sb.brothers.capstone.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
    @Query(value = "SELECT * FROM category WHERE name_code in (SELECT bc.category_id FROM book_category as bc WHERE bc.book_id = :bookId)",
            nativeQuery = true)
    Set<Category> findAllCategoriesByBookId(@Param("bookId") int bookId);
}
