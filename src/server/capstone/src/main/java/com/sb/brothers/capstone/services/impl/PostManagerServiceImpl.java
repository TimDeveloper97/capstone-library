package com.sb.brothers.capstone.services.impl;

import com.sb.brothers.capstone.entities.ManagerPost;
import com.sb.brothers.capstone.repositories.PostManagerRepository;
import com.sb.brothers.capstone.services.PostManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PostManagerServiceImpl implements PostManagerService {

    @Autowired
    private PostManagerRepository postManagerRepository;

    @Override
    public void save(ManagerPost managerPost) {
        postManagerRepository.save(managerPost);
    }
}
