package com.sb.brothers.capstone.repositories;

import com.sb.brothers.capstone.entities.Report;
import com.sb.brothers.capstone.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, String> {
    @Query(value = "SELECT * FROM Report WHERE created_by = :userId",
            nativeQuery = true)
    List<Role> getReportByUserId(@Param("userId") String userId);
}
