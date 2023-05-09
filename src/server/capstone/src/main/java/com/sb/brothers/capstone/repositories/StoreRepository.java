package com.sb.brothers.capstone.repositories;

import com.sb.brothers.capstone.entities.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store,Integer> {
    Optional<Store> findStoreByAddress(String address);
    void deleteById(int id);
}
