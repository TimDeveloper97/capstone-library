package com.sb.brothers.capstone.services.impl;

import com.sb.brothers.capstone.entities.CustomUserDetail;
import com.sb.brothers.capstone.entities.User;
import com.sb.brothers.capstone.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Optional<User> user = userService.getUserById(id);
        user.orElseThrow(() -> new UsernameNotFoundException("User with id " + id + " was not found in the database"));
        return user.map(CustomUserDetail::new).get(); // convert optional tu <User> sang <CustomUserDetail> sau do get() data tu optional
    }
}
