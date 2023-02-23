package com.sb.brothers.capstone.services;

import com.sb.brothers.capstone.entities.Role;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface RoleService  {
    List<Role> getAllRole();
    Optional<Role> findRoleById(String id);
    List<Role> getAllByUserId(String id);
}
