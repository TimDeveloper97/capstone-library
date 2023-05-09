package com.sb.brothers.capstone.services.impl;

import com.sb.brothers.capstone.entities.Store;
import com.sb.brothers.capstone.repositories.StoreRepository;
import com.sb.brothers.capstone.services.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class StoreServiceImpl implements StoreService {

    @Autowired
    private StoreRepository storeRepository;

    @Override
    public void save(Store store) {
        storeRepository.saveAndFlush(store);
    }

    @Override
    public List<Store> getAll() {
        return storeRepository.findAll();
    }

    @Override
    public Optional<Store> getStoreById(int id) {
        return storeRepository.findById(id);
    }

    @Override
    public Optional<Store> getStoreByAddress(String address) {
        return storeRepository.findStoreByAddress(address);
    }

    @Override
    public void remove(Store store) {
        storeRepository.deleteById(store.getId());
    }
}
