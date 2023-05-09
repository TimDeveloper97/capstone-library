package com.sb.brothers.capstone.repositories;

import com.sb.brothers.capstone.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findUserByEmail(String email);
    Optional<User> findUserByEmailAndId(String email, String id);

    /*@Modifying
    @Transactional
    @Query(value = "UPDATE users SET password = :newPass  WHERE id = :id",
            nativeQuery = true)
    void changePassword(@Param("newPass") String newPass, @Param("id") String id);*/

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE users SET `address` = :address, " +
            "`email` = :email,`first_name` = :firstName,`last_name` = :lastName," +
            "`modified_date` = :modifiedDate,`phone` = :phone  WHERE id = :id",
            nativeQuery = true)
    void updateProfile(@Param("id") String id, @Param("address") String address, @Param("email") String email,@Param("firstName") String firstName, @Param("lastName") String lastName,@Param("modifiedDate") Date modifiedDate,@Param("phone") String phone);

    @Query(value = "SELECT user_id FROM post as p WHERE p.id = :id",
            nativeQuery = true)
    Optional<String> getUserByPostId(@Param("id") int id);

    @Query(value = "SELECT * FROM users WHERE id IN (SELECT user_id FROM user_role AS ur WHERE ur.role_id = :role_id)",
            nativeQuery = true)
    List<User> getAllUsersByRole(@Param("role_id") int roleId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE users SET `balance` = :balance WHERE id = :id",
            nativeQuery = true)
    void updateBalance(@Param("id") String id, @Param("balance") int balance);
}
