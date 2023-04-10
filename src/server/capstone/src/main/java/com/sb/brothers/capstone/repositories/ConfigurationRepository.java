package com.sb.brothers.capstone.repositories;

import com.sb.brothers.capstone.entities.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface ConfigurationRepository extends JpaRepository<Configuration, Integer> {

    @Transactional
    @Modifying
    @Query(value = "update Configuration set Configuration.value_cfg = :value where Configuration.key_cfg = :key",nativeQuery = true)
    void updateConfig(@Param("key") String key, @Param("value") int value);

    Optional<Configuration> getConfigurationByKey(String key);
}
