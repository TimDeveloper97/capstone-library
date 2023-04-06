package com.sb.brothers.capstone.dto;

import com.sb.brothers.capstone.entities.Configuration;
import lombok.Data;

@Data
public class ConfigDto {
	private int id;
	private String key;
	private Integer value;

	public ConfigDto() {
	}

	public ConfigDto(Configuration config) {
		this.id = config.getId();
		this.key = config.getKey();
		this.value = config.getValue();
	}
/*
	public void convertConfig(Configuration config){
		config.setId(this.id);
		config.setKey(this.key);
		config.setValue(this.value);
	}*/
}