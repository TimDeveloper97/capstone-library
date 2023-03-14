package com.sb.brothers.capstone.repositories;

import com.sb.brothers.capstone.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ChatRepository extends JpaRepository<Message, Integer> {

    @Query(value = "Select * from Message where (userA_id = :fId AND userB_id = :sId) OR (userA_id = :sId AND userB_id = :fId) ORDER  BY created_date ASC",
            nativeQuery = true)
    Set<Message> findAllMessagesByUserId(@Param("fId") String fId, @Param("sId") String sId);

}
