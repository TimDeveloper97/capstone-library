package com.sb.brothers.capstone.services.impl;

import com.sb.brothers.capstone.entities.User;
import com.sb.brothers.capstone.repositories.UserRepository;
import com.sb.brothers.capstone.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Optional;
@Component
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;
    @Override
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void updateUser(User user) {
        userRepository.save(user);
    }

    @Override
    public void removeUserById(String id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public Boolean isUserExist(String id) {
        return userRepository.existsById(id);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public Optional<User> getUserByEmailAndId(String email, String id) {
        return userRepository.findUserByEmailAndId(email, id);
    }

    @Override
    public void changePassword(String id, String newPass) {
        userRepository.changePassword(newPass, id);
    }

    @Override
    public void updateProfile(String id, String address, String email, String firstName, String lastName, Date modifiedDate, String phone) {
        userRepository.updateProfile(id, address, email, firstName, lastName, modifiedDate, phone);
    }
}
