package com.sb.brothers.capstone.global;

import com.sb.brothers.capstone.entities.Book;

import java.util.ArrayList;
import java.util.List;

public class GlobalData {
    //tao bien toan cuc
    public static List<Book> cart;

    static {
        cart = new ArrayList<>();
    }

}
