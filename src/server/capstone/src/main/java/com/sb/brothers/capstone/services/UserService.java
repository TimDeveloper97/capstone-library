package com.sb.brothers.capstone.services;

import com.sb.brothers.capstone.entities.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {
    List<User> getAllUser();
    void updateUser(User user);
    void removeUserById(String id);
    Optional<User> getUserById(String id);
    Optional<User> getUserByEmail(String email);
}
