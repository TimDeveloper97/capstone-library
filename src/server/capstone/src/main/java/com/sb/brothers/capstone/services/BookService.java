package com.sb.brothers.capstone.services;

import com.sb.brothers.capstone.entities.Book;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface BookService {

	List<Book> getAllBookByCategoryId(String id);

	Optional<Book> getBookById(int id);

	void removeBookById(int id);

	void updateBook(Book book);

	List<Book> getAllBook();
    
}
