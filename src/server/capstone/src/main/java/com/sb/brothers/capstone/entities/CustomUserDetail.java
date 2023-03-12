package com.sb.brothers.capstone.entities;

import com.sb.brothers.capstone.configuration.BeanClass;
import com.sb.brothers.capstone.services.RoleService;
import com.sb.brothers.capstone.util.CustomStatus;
import com.sb.brothers.capstone.util.UserNotActivatedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


public class CustomUserDetail extends User implements UserDetails {

    private RoleService roleService = BeanClass.getBean(RoleService.class);

    public CustomUserDetail(User user){
        super(user);
    }//ke thua lai model user

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if ((super.getStatus() & CustomStatus.ACTIVATE) == 0) {
            throw new UserNotActivatedException("User " + super.getId() + " was not activated");
        }
        List<GrantedAuthority> authorityList = new ArrayList<>();
        roleService.getAllByUserId(super.getId()).forEach(role -> {
                    authorityList.add(new SimpleGrantedAuthority(role.getName()));
                });
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
