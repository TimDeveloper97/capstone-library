package com.sb.brothers.capstone.repositories;

import com.sb.brothers.capstone.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    List<Book> findAllByCategoryId(String id);
}
