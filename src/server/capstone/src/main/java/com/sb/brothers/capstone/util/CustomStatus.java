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
     * USER STATUS
     * BIT 5:   0 - DEACTIVATE, 1 - ACTIVATE
     * BIT 6:   1 - BLOCK_POST, 0 - NONE_BLOCK
     */
    public static final int ACTIVATE                    = 32;
    public static final int BLOCK_POST                  = 64;

    /*
    public static final int SUCCESS             =  0;

    public static final int NOT_FOUND           =  100;

    public static final int UNAUTHENTICATED     =  200;

    public static final int PERMISSION_DENY     =  201;
    */

    /**
     * Post status      0 - Admin's post,
     *                  2 - User's post is not approved
     *                  4 - User's post is approved
     */

    public static final int ADMIN_POST                  = 0;
    public static final int USER_POST_IS_NOT_APPROVED   = 2;
    public static final int USER_POST_IS_APPROVED       = 4;
    public static final int USER_RETURN_IS_NOT_APPROVED = 8;
    public static final int USER_RETURN_IS_APPROVED     = 16;
    public static final int USER_REQUEST_IS_DENY        = 32;
}
