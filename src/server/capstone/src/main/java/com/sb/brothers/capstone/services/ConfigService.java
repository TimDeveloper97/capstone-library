package com.sb.brothers.capstone.services;

import com.sb.brothers.capstone.entities.Configuration;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ConfigService {

    void update(Configuration config);

    Optional<Configuration> getConfigurationByKey(String key);

    List<Configuration> findAll();
}
