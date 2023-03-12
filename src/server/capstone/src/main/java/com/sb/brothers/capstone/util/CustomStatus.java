package com.sb.brothers.capstone.util;

public class CustomStatus {

    /**
     * BIT 7:   0 - HIDE, 1 - SHOW
     */
    public static final int SHOW         = 128;

    /**
     * BIT 6:   0 - DENY, 1 - ACCEPT
     */
    public static final int ACCEPT       = 64;

    /**
     * BIT 5:   0 - DEACTIVATE, 1 - ACTIVATE
     */
    public static final int ACTIVATE = 32;

    public static final int SUCCESS             =  0;

    public static final int NOT_FOUND           =  100;


    public static final int UNAUTHENTICATED     =  200;

    public static final int PERMISSION_DENY     =  201;
}
