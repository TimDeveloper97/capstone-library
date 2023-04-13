package com.sb.brothers.capstone.services.impl;

import com.sb.brothers.capstone.entities.PostDetail;
import com.sb.brothers.capstone.repositories.PostDetailRepository;
import com.sb.brothers.capstone.services.PostDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PostDetailServiceImpl implements PostDetailService {

    @Autowired
    private PostDetailRepository postDetailRepository;

    @Override
    public void save(PostDetail postDetail) {
        postDetailRepository.saveAndFlush(postDetail);
    }

    @Override
    public List<PostDetail> findAllByPostId(int id) {
        return postDetailRepository.findAllByPostId(id);
    }

    @Override
    public void deleteAllByPostId(int postId) {
        postDetailRepository.deleteAllByPostId(postId);
    }

    @Override
    public List<PostDetail> findPostDetailByBookAndStatus(int bookId) {
        return postDetailRepository.findPostDetailByBookAndStatus(bookId);
    }

    @Override
    public PostDetail findByBookId(int id) {
        return postDetailRepository.findByBookId(id).get();
    }
}
