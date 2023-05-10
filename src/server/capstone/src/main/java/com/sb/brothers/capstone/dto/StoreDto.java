package com.sb.brothers.capstone.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.sb.brothers.capstone.entities.Store;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class StoreDto {
    @JsonInclude(JsonInclude.Include.NON_DEFAULT)
    private int id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String address;
    private List<String> stores;

    public StoreDto(){
        stores = new ArrayList<>();
    }

    public void ConvertToStore(Store store){
        this.id = store.getId();
        this.address = store.getAddress();
    }

    public StoreDto(Store store) {
        this.id = store.getId();
        this.address = store.getAddress();
    }
}
