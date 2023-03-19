package com.sb.brothers.capstone.repositories;

import com.sb.brothers.capstone.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    @Query(value = "SELECT * FROM books WHERE id in (SELECT bc.book_id FROM book_category as bc WHERE bc.category_id = :catId)",
            nativeQuery = true)
    Set<Book> findAllByCategory(@Param("catId") String catId);

    @Query(value = "Select * from books where id in (select pd.book_id from post_detail as pd inner join post as p on p.id = pd.post_id where p.user_id = :uId)",
            nativeQuery = true)
    Set<Book> findAllByUserId(@Param("uId") String uId);

    @Query(value = "Select * from books where user_id = :uId",
            nativeQuery = true)
    Set<Book> getListBooksOfUserId(@Param("uId") String uId);

    Set<Book> findByNameContains(String name);

    Set<Book> findByAuthorContains(String name);

    @Query(value = "SELECT * FROM books where id in (SELECT b.id from books as b left join post_detail as pd on b.id = pd.book_id " +
            " join post as p on p.id = pd.post_id where p.address like %:address%)",
            nativeQuery = true)
    Set<Book> findByPostLocation(@Param("address") String address);

    @Query(value = "select * from books where id in " +
            "(select bca.book_id from category as c inner join book_category as bca on c.name_code =  bca.category_id where c.name_code in " +
            "(Select Distinct category_id from favourite_book as fb join book_category as bc on fb.book_id = bc.book_id where fb.user_id = :uId and fb.rating >= 7))", nativeQuery = true)
    Set<Book> recommendBooks(@Param("uId") String uId);

    @Query(value = "Select * from books where in_stock > 0",
            nativeQuery = true)
    Set<Book> findAllBooksInStock();
}
