package com.sb.brothers.capstone.services;

import com.sb.brothers.capstone.entities.Store;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface StoreService {
    void save(Store store);
    List<Store> getAll();
    Optional<Store> getStoreById(int id);
    Optional<Store> getStoreByAddress(String address);
    void remove(Store store);
}
