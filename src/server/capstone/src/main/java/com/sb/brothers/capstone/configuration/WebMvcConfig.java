package com.sb.brothers.capstone.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@Configuration
public class WebMvcConfig extends WebMvcConfigurationSupport {
    private static final String CLASSPATH = "classpath:";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/templates/**", "/static/**")
                .addResourceLocations(CLASSPATH+"/templates/", CLASSPATH+"/static/");
    }
}
