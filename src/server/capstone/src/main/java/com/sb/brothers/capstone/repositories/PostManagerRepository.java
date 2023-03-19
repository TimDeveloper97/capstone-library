package com.sb.brothers.capstone.repositories;

import com.sb.brothers.capstone.entities.ManagerPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostManagerRepository extends JpaRepository<ManagerPost,Integer> {
}
