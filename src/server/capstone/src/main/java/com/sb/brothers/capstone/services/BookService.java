package com.sb.brothers.capstone.services;

import com.sb.brothers.capstone.entities.Book;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public interface BookService {

	Set<Book> getAllBooksByCategory(String id);

	Optional<Book> getBookById(int id);

	void removeBookById(int id);

	void updateBook(Book book);

	List<Book> getAllBook();

    boolean isBookExist(int id);

    Set<Book> getAllBooksByUserId(String id);

    Set<Book> searchBookByName(String name);

	Set<Book> searchBookByAuthor(String author);

	Set<Book> searchBookByPostLocation(String address);

	Set<Book> getListBooksOfUserId(String uId);

	Set<Book> searchBySuggest(String uId);

}
