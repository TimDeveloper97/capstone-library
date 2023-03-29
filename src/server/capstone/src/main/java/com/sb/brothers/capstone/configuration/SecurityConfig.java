package com.sb.brothers.capstone.configuration;

import com.sb.brothers.capstone.configuration.jwt.JWTConfigurer;
import com.sb.brothers.capstone.configuration.jwt.JwtAccessDeniedHandler;
import com.sb.brothers.capstone.configuration.jwt.JwtAuthenticationEntryPoint;
import com.sb.brothers.capstone.configuration.jwt.TokenProvider;
import com.sb.brothers.capstone.services.impl.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfig {
    @Autowired
    GoogleOAuth2SuccessHandler googleOAuth2SuccessHandler;

    @Autowired
    CustomUserDetailService customUserDetailService;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private CorsFilter corsFilter;

    @Autowired
    private JwtAuthenticationEntryPoint authenticationErrorHandler;

    @Autowired
    private JwtAccessDeniedHandler jwtAccessDeniedHandler;


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                //permit all url
                .authorizeRequests()
                .antMatchers("/", "/api/forgotpassword", "/api/register", "/api/login", "/api/logout").permitAll()
                //.antMatchers("/admin/**").hasRole("ADMIN")
                //.antMatchers("/users/**").hasRole("USER")
                //.anyRequest()
                //.authenticated()

                .and()
                .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)

                .exceptionHandling()
                .authenticationEntryPoint(authenticationErrorHandler)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                // enable mysql-console
                .and()
                .headers()
                .frameOptions()
                .sameOrigin()

                // create no session
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .apply(securityConfigurerAdapter())

                /*
                //google authen
                .and()
                .oauth2Login()
                .loginPage("/api/login")
                .successHandler(googleOAuth2SuccessHandler)

                //check login
                .and()
                .formLogin()
                .loginPage("/api/login")
                .usernameParameter("username")
                .passwordParameter("password")
                .defaultSuccessUrl("/")
                .failureUrl("/api/login?error=true")

                //when you logout
                .and()
                .logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/api/logout"))
                .logoutSuccessUrl("/api/login")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                */

                //declare exeption
                .and()
                .exceptionHandling().accessDeniedPage("/403")

                //thymeleaf already has token, so disable csrf
                .and()
                .csrf()
                .disable();
        //http.headers().frameOptions().disable();

        http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(customUserDetailService)
                .passwordEncoder(bCryptPasswordEncoder());
        return http.build();
    }

    private JWTConfigurer securityConfigurerAdapter() {
        return new JWTConfigurer(tokenProvider);
    }

    @Bean
    public PasswordEncoder bCryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }//ma hoa password


    @Bean
    public WebSecurityCustomizer webSecurityCustomizer(){
        return (web)-> web.ignoring().antMatchers(/*"/resources/**",
                "/templates/**",
                "/static/**",*/
                "/images/**"
                /*"/productImages/**",
                "/css/**",
                "/js/**"*/);
    }//bo qua authen cac package nay
}
