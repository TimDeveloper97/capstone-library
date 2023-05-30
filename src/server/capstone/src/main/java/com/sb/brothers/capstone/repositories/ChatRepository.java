package com.sb.brothers.capstone.repositories;

import com.sb.brothers.capstone.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ChatRepository extends JpaRepository<Message, Integer> {

    @Query(value = "Select * from message where (usera_id = :fId AND userb_id = :sId) OR (usera_id = :sId AND userb_id = :fId) ORDER  BY created_date ASC",
            nativeQuery = true)
    Set<Message> findAllMessagesByUserId(@Param("fId") String fId, @Param("sId") String sId);

}
