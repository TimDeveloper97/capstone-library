package com.sb.brothers.capstone.util;

public class CustomErrorType {

    private boolean isSuccess;
    private String message;

    public CustomErrorType(boolean isSuccess, String message) {
        this.isSuccess = isSuccess;
        this.message = message;
    }

    public CustomErrorType(String message) {
        this.isSuccess = false;
        this.message = message;
    }

    public boolean isSuccess() {
        return isSuccess;
    }

    public String getMessage(){
        return message;
    }

}
