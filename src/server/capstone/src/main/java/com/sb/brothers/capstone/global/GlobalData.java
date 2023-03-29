package com.sb.brothers.capstone.global;

import com.sb.brothers.capstone.dto.PostDto;
import com.sb.brothers.capstone.entities.Book;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class GlobalData {
    //tao bien toan cuc
    public static HashMap<String, List<PostDto>> cart;
    public static int cntMess = 0;
    public static String SUBJECT_MAIL = "[CAPSTONE][REP] Lấy lại mật khẩu";
    public static HashMap<String, String> mapCurrPass = new HashMap<>();


    static {
        cart = new HashMap<>();
    }

    public static String getSubject(){
        return SUBJECT_MAIL + " No #" + cntMess++;
    }

    public static String getContent(String content){
        return new String("New your password is: " + content +". Please change password after next login.");
    }


}
