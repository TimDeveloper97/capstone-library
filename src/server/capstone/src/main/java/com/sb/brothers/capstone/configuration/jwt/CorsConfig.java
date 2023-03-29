package com.sb.brothers.capstone.configuration.jwt;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
public class CorsConfig {

   private static final List<String> DEFAULT_PERMIT_ALL =  Arrays.asList("*");

   @Bean
   public CorsFilter corsFilter() {
      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      CorsConfiguration config = new CorsConfiguration();
      config.setAllowCredentials(true);
      //config.addAllowedOrigin("*"); // e.g. http://domain1.com
      config.addAllowedHeader("*");
      config.addAllowedMethod("*");
      config.setAllowedOriginPatterns(DEFAULT_PERMIT_ALL);
      //config.setAllowedOrigins(List.of("http://localhost:3000", "http://127.0.0.1:80"));
      source.registerCorsConfiguration("/**", config);
      return new CorsFilter(source);
   }

}
