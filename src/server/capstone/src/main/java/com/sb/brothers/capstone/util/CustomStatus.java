package com.sb.brothers.capstone.util;

public class CustomStatus {

    /**
     * Notification status
     */
    public static final int SENT         = 0;
    public static final int SEEN         = 1;

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
    /**
     * ADMIN_POST               : Bài đăng của admin
     */
    public static final int ADMIN_POST                  = 0;
    public static final int RETURNED_THE_BOOK_TO_THE_USER           = 1;
    public static final int USER_REQUEST_IS_DENY        = 2;
    public static final int USER_POST_IS_NOT_APPROVED   = 4;
    public static final int ADMIN_DISABLE_POST          = 8;
    public static final int USER_POST_IS_APPROVED       = 16;


    /**
     * Order status
     *
     * USER_PAYMENT_SUCCESS         : Thanh toán thành công
     * USER_WAIT_TAKE_BOOK          : Chờ lấy sách(sau khi thanh toán thành công)
     */
    public static final int USER_PAYMENT_SUCCESS        = 32;
    public static final int USER_WAIT_TAKE_BOOK         = 64;

    /**
     * USER_RETURN_IS_NOT_APPROVED  : Khách hàng đã lấy sách
     * USER_RETURN_IS_APPROVED      : Khách hàng đã trả sách
     */
    public static final int USER_RETURN_IS_NOT_APPROVED = 128;
    public static final int USER_RETURN_IS_APPROVED     = 256;
    public static final int USER_POST_IS_EXPIRED        = 512;
}
