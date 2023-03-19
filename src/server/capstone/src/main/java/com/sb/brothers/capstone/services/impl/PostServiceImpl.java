package com.sb.brothers.capstone.services.impl;

import com.sb.brothers.capstone.entities.Post;
import com.sb.brothers.capstone.repositories.PostRepository;
import com.sb.brothers.capstone.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Component
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAllPosts();
    }

    @Override
    public List<Post> getAllPostsByStatus(int status) {
        return postRepository.findAllPostsByStatus(status);
    }

    @Override
    public void updateStatus(int postId, int status) {
        postRepository.updateStatus(postId, status);
    }

    @Override
    public List<Post> getAllPostsByUserId(String id) {
        return postRepository.findAllByUserId(id);
    }

    @Override
    public Optional<Post> getPostById(int id) {
        return postRepository.findById(id);
    }

    @Override
    public void removePostById(int id) {
        postRepository.deleteById(id);
    }

    @Override
    public void updatePost(Post post) {
        postRepository.save(post);
    }

    @Override
    public boolean isPostExist(int id) {
        return postRepository.existsById(id);
    }
}
