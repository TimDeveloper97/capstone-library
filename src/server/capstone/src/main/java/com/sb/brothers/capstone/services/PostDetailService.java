package com.sb.brothers.capstone.services;

import com.sb.brothers.capstone.entities.PostDetail;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface PostDetailService {
    void save(PostDetail postDetail);
    List<PostDetail> findAllByPostId(int id);
    void deleteAllByPostId(int postId);
    Optional<PostDetail> findByBookId(int id);
}
