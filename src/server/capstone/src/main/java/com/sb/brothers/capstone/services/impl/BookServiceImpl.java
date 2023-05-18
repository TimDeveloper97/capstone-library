package com.sb.brothers.capstone.services.impl;

import com.sb.brothers.capstone.entities.Book;
import com.sb.brothers.capstone.repositories.BookRepository;
import com.sb.brothers.capstone.services.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Component
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepository bookRepository;

    @Override
	public List<Book> getAllBook() {
        return bookRepository.findAllBooksInStock();
    }//findAll

    @Override
    public List<Book> getAllBookByStore(String address) {
        return bookRepository.findAllBooksInStockByAddress(address);
    }//findAll

    @Override
    public boolean isBookExist(int id) {
        return bookRepository.existsById(id);
    }

    @Override
    public Set<Book> getAllByManagerId(String uId) {
        return bookRepository.getAllByManagerId(uId);
    }

    @Override
    public Set<Book> getAllBooksByUserId(String id) {
        return bookRepository.findAllByUserId(id);
    }

    @Override
    public Set<Book> searchBookByName(String name) {
        return bookRepository.findByNameContains(name);
    }

    @Override
    public Set<Book> searchBookByAuthor(String author) {
        return bookRepository.findByAuthorContains(author);
    }

    @Override
    public Set<Book> searchBookByPostLocation(String address) {
        return bookRepository.findByPostLocation(address);
    }

    @Override
    public Set<Book> getListBooksOfUserId(String uId) {
        return bookRepository.getListBooksOfUserId(uId);
    }

    @Override
    public Set<Book> searchBySuggest(String uId) {
        return null;//bookRepository.recommendBooks(uId);
    }

    @Override
	public void updateBook(Book book) {
        bookRepository.saveAndFlush(book);
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
	public Set<Book> getAllBooksByCategory(String id) {
        return bookRepository.findAllByCategory(id);
    }
    //findList theo BookDTO.categoryId

}
