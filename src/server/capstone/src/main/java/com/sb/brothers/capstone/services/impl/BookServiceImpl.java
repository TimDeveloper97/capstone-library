package com.sb.brothers.capstone.services.impl;

import com.sb.brothers.capstone.entities.Book;
import com.sb.brothers.capstone.repositories.BookRepository;
import com.sb.brothers.capstone.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class BookServiceImpl implements BookService {
    @Autowired
    BookRepository bookRepository;

    @Override
	public List<Book> getAllBook() {
        return bookRepository.findAll();
    }//findAll

    @Override
	public void updateBook(Book book) {
        bookRepository.save(book);
    }//add or update (tuy vao pri-key)

    @Override
	public void removeBookById(int id) {
        bookRepository.deleteById(id);
    }//delete dua vao pri-key

    @Override
	public Optional<Book> getBookById(int id) {
        return bookRepository.findById(id);
    }//search theo id

    @Override
	public List<Book> getAllBookByCategoryId(String id) {
        return bookRepository.findAllByCategoryId(id);
    }
    //findList theo BookDTO.categoryId

}
