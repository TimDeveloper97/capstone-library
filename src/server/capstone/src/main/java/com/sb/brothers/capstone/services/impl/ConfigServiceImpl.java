package com.sb.brothers.capstone.services.impl;

import com.sb.brothers.capstone.entities.Configuration;
import com.sb.brothers.capstone.repositories.ConfigurationRepository;
import com.sb.brothers.capstone.services.ConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ConfigServiceImpl implements ConfigService {

    @Autowired
    private ConfigurationRepository configRepository;

    @Override
    public void update(Configuration config) {
        configRepository.updateConfig(config.getKey(), config.getValue());
    }

    @Override
    public Optional<Configuration> getConfigurationByKey(String key) {
        return configRepository.getConfigurationByKey(key);
    }

    @Override
    public List<Configuration> findAll() {
        return configRepository.findAll();
    }
}
