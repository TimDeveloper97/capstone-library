package com.sb.brothers.capstone.repositories;

import com.sb.brothers.capstone.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    @Query(value = "SELECT * FROM books WHERE id in (SELECT bc.book_id FROM book_category as bc WHERE bc.category_id = :catId)",
            nativeQuery = true)
    Set<Book> findAllByCategory(@Param("catId") String catId);

    @Query(value = "Select * from books where id in (select pd.book_id from post_detail as pd inner join post as p on p.id = pd.post_id where p.user_id = :uId)",
            nativeQuery = true)
    Set<Book> findAllByUserId(@Param("uId") String uId);

    @Query(value = "Select * from books where user_id = :uId and in_stock > 0",
            nativeQuery = true)
    Set<Book> getAllByManagerId(@Param("uId")String uId);

    @Query(value = "Select * from books where user_id = :uId and books.percent = 0",
            nativeQuery = true)
    Set<Book> getListBooksOfUserId(@Param("uId") String uId);

    Set<Book> findByNameContains(String name);

    Set<Book> findByAuthorContains(String name);

    @Query(value = "SELECT * FROM books where id in (SELECT b.id from books as b left join post_detail as pd on b.id = pd.book_id " +
            " join post as p on p.id = pd.post_id where p.address like %:address%)",
            nativeQuery = true)
    Set<Book> findByPostLocation(@Param("address") String address);

    @Query(value = "SELECT * FROM books WHERE id IN " +
            "(SELECT DISTINCT bca.book_id FROM category AS c INNER JOIN book_category AS bca ON c.name_code =  bca.category_id " +
            "INNER JOIN post_detail AS pd ON pd.book_id = bca.book_id " +
            "INNER JOIN post AS p ON p.id = pd.post_id " +
            "WHERE p.status = 0 AND  c.name_code IN " +
            "(SELECT DISTINCT category_id FROM post AS p JOIN post_detail AS pd ON p.id = pd.post_id " +
            "INNER JOIN book_category AS bc ON bc.book_id = pd.book_id WHERE (p.status BETWEEN 32 AND 256) AND user_id = :uId))", nativeQuery = true)
    Set<Book> recommendBooks(@Param("uId") String uId);

    @Query(value = "SELECT * FROM books WHERE id IN " +
            "(SELECT DISTINCT bca.book_id FROM category AS c INNER JOIN book_category AS bca ON c.name_code =  bca.category_id " +
            "INNER JOIN post_detail AS pd ON pd.book_id = bca.book_id " +
            "INNER JOIN post AS p ON p.id = pd.post_id " +
            "WHERE p.status = 0 AND  c.name_code IN " +
            "(SELECT DISTINCT category_id FROM post AS p JOIN post_detail AS pd ON p.id = pd.post_id INNER JOIN book_category AS bc ON bc.book_id = pd.book_id WHERE p.status = 0))", nativeQuery = true)
    Set<Book> recommendBooksForNonUser();

    @Query(value = "SELECT * FROM books WHERE id IN (SELECT book_id FROM post_detail WHERE sublet > 0 AND post_id IN (SELECT id FROM post WHERE `status` = 16) ) OR (user_id IN (SELECT DISTINCT user_Id FROM user_role WHERE user_role.role_id  = 1 OR user_role.role_id = 3) AND quantity = 0)",
            nativeQuery = true)
    List<Book> findAllBooksInStock();

    @Query(value = "SELECT * FROM books WHERE id IN (SELECT book_id FROM post_detail WHERE sublet > 0 AND post_id IN (SELECT id FROM post WHERE `status` = 16 AND address = :address) ) OR (user_id IN (SELECT DISTINCT user_Id FROM user_role WHERE user_role.role_id  = 1 OR user_role.role_id = 3) AND quantity = 0)",
            nativeQuery = true)
    List<Book> findAllBooksInStockByAddress(@Param("address") String address);
}
