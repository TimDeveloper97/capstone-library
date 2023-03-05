package com.sb.brothers.capstone.global;

import com.sb.brothers.capstone.entities.Book;

import java.util.ArrayList;
import java.util.List;

public class GlobalData {
    //tao bien toan cuc
    public static List<Book> cart;
    public static int cntMess = 0;
    public static String SUBJECT_MAIL = "[CAPSTONE][REP] Lấy lại mật khẩu";

    static {
        cart = new ArrayList<>();
    }

    public static String getSubject(){
        return SUBJECT_MAIL + " No #" + cntMess++;
    }

    public static String getContent(String content){
        return new String("New your password is: " + content +". Please change password after next login.");
    }
}
