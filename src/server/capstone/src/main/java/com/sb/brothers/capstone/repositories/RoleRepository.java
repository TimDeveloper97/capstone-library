package com.sb.brothers.capstone.repositories;

import com.sb.brothers.capstone.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {
    @Query(value = "SELECT * FROM roles WHERE id in (SELECT ur.role_id FROM user_role as ur WHERE ur.user_id = :userId)",
            nativeQuery = true)
    List<Role> getRoleByUserId(@Param("userId") String userId);

    Role findRoleByName(String name);

    @Query(value = "SELECT * FROM roles WHERE id in (SELECT role_id FROM user_role as ur WHERE ur.user_id = (SELECT user_id FROM books where id = :bookId))",
            nativeQuery = true)
    List<Role> getAllRoleByBookId(@Param("bookId") int id);
}
