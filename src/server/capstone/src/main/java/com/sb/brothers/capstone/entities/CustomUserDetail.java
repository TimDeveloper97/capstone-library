package com.sb.brothers.capstone.entities;

import com.sb.brothers.capstone.configuration.BeanClass;
import com.sb.brothers.capstone.services.RoleService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


public class CustomUserDetail extends User implements UserDetails {

    private RoleService roleService = BeanClass.getBean(RoleService.class);

    public CustomUserDetail(User user){
        super(user);
    }//ke thua lai model user

    public static User getPrincipal() {
        Authentication auth = (SecurityContextHolder.getContext()).getAuthentication();
        User myUser = null;
        if(auth != null) {
            myUser = (User) auth.getPrincipal();
        }
        return myUser;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorityList = new ArrayList<>();
        roleService.getAllByUserId(super.getId()).forEach(role -> {
                    authorityList.add(new SimpleGrantedAuthority(role.getName()));
                });
        /*super.getRoles().forEach(role -> {
            authorityList.add(new SimpleGrantedAuthority(role.getName()));
        });*/
        return authorityList;
    } //load menu role cho GrantedAuthority

    @Override
    public String getUsername() {
        return super.getId();
    }
    @Override
    public String getPassword() {
        return super.getPassword();
    }

    @Override
    public boolean isAccountNonExpired() {
        //TODO
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        //TODO
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        //TODO
        return true;
    }

    @Override
    public boolean isEnabled() {
        //TODO
        return true;
    }
}
