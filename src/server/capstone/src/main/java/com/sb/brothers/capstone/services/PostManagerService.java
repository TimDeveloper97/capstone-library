package com.sb.brothers.capstone.services;

import com.sb.brothers.capstone.entities.ManagerPost;
import org.springframework.stereotype.Service;

@Service
public interface PostManagerService {
    void save(ManagerPost managerPost);
}
