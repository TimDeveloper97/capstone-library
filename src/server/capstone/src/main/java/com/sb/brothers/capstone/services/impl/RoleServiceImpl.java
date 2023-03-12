package com.sb.brothers.capstone.services.impl;

import com.sb.brothers.capstone.entities.Role;
import com.sb.brothers.capstone.repositories.RoleRepository;
import com.sb.brothers.capstone.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class RoleServiceImpl implements RoleService {
    @Autowired
    RoleRepository roleRepository;

    public List<Role> getAllRole() {
        return roleRepository.findAll();
    }

    public Role findRoleByName(String id){
        return roleRepository.findRoleByName(id);
    }

    @Override
    public List<Role> getAllByUserId(String id) {
        return roleRepository.getRoleByUserId(id);
    }

}
