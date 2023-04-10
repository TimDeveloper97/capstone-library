package com.sb.brothers.capstone.repositories;

import com.sb.brothers.capstone.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {
    @Query(value = "SELECT * FROM image WHERE book_id = :bookId)",
            nativeQuery = true)
    Set<Image> getImagesByBookId(@Param("bookId") int bookId);

    Image findImageById(int id);
}
