package com.sb.brothers.capstone.repositories;

import com.sb.brothers.capstone.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    @Query(value = "SELECT * FROM post WHERE status = :status",
            nativeQuery = true)
    List<Post> findAllPostsByStatus(@Param("status") int status);

    @Query(value = "UPDATE post SET status = :status  WHERE id = :id",
            nativeQuery = true)
    void updateStatus(@Param("id") int id, @Param("status") int status);

    @Query(value = "SELECT * FROM post WHERE user_id = :id",
            nativeQuery = true)
    List<Post> findAllByUserId(@Param("id") String id);

    @Query(value = "SELECT * FROM post WHERE status = 0",
            nativeQuery = true)
    List<Post> findAllPosts();

}
