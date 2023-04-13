package com.sb.brothers.capstone.repositories;

import com.sb.brothers.capstone.entities.PostDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostDetailRepository extends JpaRepository<PostDetail,Integer> {
    List<PostDetail> findAllByPostId(int id);

    @Transactional
    @Query(value = "DELETE FROM post_detail WHERE post_id = :postId", nativeQuery = true)
    void deleteAllByPostId(@Param("postId") int postId);

    @Query(value = "SELECT * FROM post_detail WHERE book_id = :bookId AND sublet > 1", nativeQuery = true)
    Optional<PostDetail> findByBookId(@Param("bookId") int bookId);

    @Query(value = "SELECT * FROM post_detail WHERE book_id = :bookId AND sublet = 0 AND post_id IN (SELECT id FROM post WHERE `status` between 32 and 512)", nativeQuery = true)
    List<PostDetail> findPostDetailByBookAndStatus(@Param("bookId") int bookId);
}
