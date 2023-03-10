package com.sb.brothers.capstone.services;

import com.sb.brothers.capstone.entities.Post;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public interface PostService {

	/**
	 * ADMIN
	 */
	List<Post> getAllPosts();
	List<Post> getAllPostsByStatus(int status);
	void updateStatus(int postId, int status);

	Set<Post> getAllPostsByUserId(String id);
	Optional<Post> getPostById(int id);
	void removePostById(int id);
	void updatePost(Post post);
    boolean isPostExist(int id);
}
