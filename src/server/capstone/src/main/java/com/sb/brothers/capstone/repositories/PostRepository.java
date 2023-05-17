package com.sb.brothers.capstone.repositories;

import com.sb.brothers.capstone.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    @Query(value = "SELECT * FROM post WHERE status = :status AND address = :address order by created_date",
            nativeQuery = true)
    List<Post> findAllPostsByStatus(@Param("status") int status, @Param("address") String address);

    @Modifying
    @Transactional
    @Query(value = "UPDATE post SET post.`status` = :status  WHERE id = :id",
            nativeQuery = true)
    void updateStatus(@Param("id") int id, @Param("status") int status);

    @Query(value = "SELECT * FROM post WHERE user_id = :id order by created_date",
            nativeQuery = true)
    List<Post> findAllByUserId(@Param("id") String id);

    @Query(value = "SELECT * FROM post WHERE status = 0 order by created_date",
            nativeQuery = true)
    List<Post> findAllPosts();

    @Query(value = "SELECT * FROM post WHERE id IN (SELECT post_id FROM post_detail WHERE book_id = :bId) and post.status = 0 order by created_date",
            nativeQuery = true)
    List<Post> getAllPostHasBookId(@Param("bId") int id);
}
