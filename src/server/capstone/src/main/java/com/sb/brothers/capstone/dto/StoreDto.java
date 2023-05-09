package com.sb.brothers.capstone.dto;

import com.sb.brothers.capstone.entities.Store;
import com.sb.brothers.capstone.entities.User;
import lombok.Data;

@Data
public class StoreDto {
    private int id;
    private String address;

    public void ConvertToStore(Store store){
        this.id = store.getId();
        this.address = store.getAddress();
    }

    public StoreDto(Store store) {
        this.id = store.getId();
        this.address = store.getAddress();
    }
}
