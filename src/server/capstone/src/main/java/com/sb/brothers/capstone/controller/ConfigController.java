package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.dto.ConfigDto;
import com.sb.brothers.capstone.entities.Configuration;
import com.sb.brothers.capstone.services.ConfigService;
import com.sb.brothers.capstone.util.CustomErrorType;
import com.sb.brothers.capstone.util.ResData;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequestMapping("/api/admin/config")
@RestController
public class ConfigController {
    public static final Logger logger = Logger.getLogger(ConfigController.class);

    @Autowired
    private ConfigService configService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/update")
    public ResponseEntity<?> changeConfig(@RequestBody ConfigDto configDto){
        logger.info("[API-Config] Change config - START.");
        Configuration config = null;
        try{
            config = configService.getConfigurationByKey(configDto.getKey()).get();
            if(config == null){
                logger.warn("There are no config has same key.\n[API-Config] Change config - END.");
                return new ResponseEntity<>(new CustomErrorType("Không tìm thấy cấu hình tương ứng."), HttpStatus.OK);
            }
            config.setValue(configDto.getValue());
            configService.update(config);
        }catch (Exception ex){
            logger.info("Exception:" + ex.getMessage() +".\n" + ex.getCause()
                    +"\n[API-Config] Change config - END.");
            return new ResponseEntity<>(new CustomErrorType("Xảy ra lỗi:"+ ex.getMessage() +".\n Nguyên nhân: "+ ex.getCause()), HttpStatus.OK);
        }
        logger.warn("[API-Config] Change config - SUCCESS.");
        return new ResponseEntity<>(new CustomErrorType(true, "Thay đổi cấu hình thành công."), HttpStatus.OK);
    }//view all posts

    @GetMapping("")
    public ResponseEntity<?> getAllConfig(){
        logger.info("[API-Config] Get all config - START.");
        List<Configuration> configList = null;
        List<ConfigDto> configDtoList = new ArrayList<>();
        try{
            configList = configService.findAll();
            if(configList == null || configList.isEmpty()){
                logger.warn("There are no config.\n[API-Config] Change config - END.");
                return new ResponseEntity<>(new CustomErrorType("Không tìm thấy cấu hình tương ứng."), HttpStatus.OK);
            }
            configList.stream().forEach(config -> {
                ConfigDto configDto = new ConfigDto(config);
                configDtoList.add(configDto);
            });
        }catch (Exception ex){
            logger.info("Exception:" + ex.getMessage() +".\n" + ex.getCause()
                    +"\n[API-Config] Change config - END.");
            return new ResponseEntity<>(new CustomErrorType("Xảy ra lỗi:"+ ex.getMessage() +".\n Nguyên nhân: "+ ex.getCause()), HttpStatus.OK);
        }
        logger.warn("[API-Config] Change config - SUCCESS.");
        return new ResponseEntity<>(new ResData<List<ConfigDto>>(0, configDtoList), HttpStatus.OK);
    }//view all posts
}
