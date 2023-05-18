package com.sb.brothers.capstone.controller;

import com.sb.brothers.capstone.dto.StoreDto;
import com.sb.brothers.capstone.entities.Store;
import com.sb.brothers.capstone.services.StoreService;
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
import java.util.Optional;

@RequestMapping("/api/store")
@RestController
public class StoreController {
    public static final Logger logger = Logger.getLogger(StoreController.class);

    @Autowired
    private StoreService storeService;

    public StoreDto ConvertListStoreToListStoreDto(List<Store> stores){
        StoreDto storeDto = new StoreDto();
        stores.forEach(store -> {
            storeDto.getStores().add(store.getAddress());
        });
        return storeDto;
    }

    //Stores session
    @GetMapping("")
    public ResponseEntity<?> getAllStores(){
        logger.info("[API-Store] getAllStores - START");
        logger.info("Return all stores");
        List<Store> stores = storeService.getAll();
        if(stores.isEmpty()){
            logger.warn("no content");
            logger.info("[API-Store] getAllStores - END");
            return new ResponseEntity(new CustomErrorType("Store sách trống."), HttpStatus.OK);
        }
        logger.info("[API-Store] getAllStores - SUCCESS");
        return new ResponseEntity<>(new ResData<StoreDto>(0, ConvertListStoreToListStoreDto(stores)), HttpStatus.OK);
    }//view all stores

    @PostMapping("/add")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addStore(@RequestBody StoreDto storeDto){
        logger.info("[API-Store] addStore - START");
        logger.info("Creating new store:" + storeDto.getAddress());
        Optional<Store> opStore = storeService.getStoreByAddress(storeDto.getAddress());
        if(opStore.isPresent()){
            logger.error("Unable to create. A Store with name:"
                   + storeDto.getAddress() + " already exist.");
            logger.info("[API-Store] addStore - END");
            return new ResponseEntity(new CustomErrorType("Thêm mới Store không thành công do Store "
                    + storeDto.getAddress()+ " đã tồn tại."), HttpStatus.OK);
        }
        Store store = new Store();
        storeDto.ConvertToStore(store);
        storeService.save(store);
        logger.info("[API-Store] addStore - SUCCESS");
        return new ResponseEntity(new CustomErrorType(true, "Thêm Store thành công."), HttpStatus.OK);

    }//form add new store > do add

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteStore(@PathVariable("id") int id){
        logger.info("[API-Store] deleteStore - START");
        logger.info("Fetching & Deleting Store with address " + id);
        Optional<Store> store = storeService.getStoreById(id);
        if(store.isEmpty()){
            logger.error("Store with name: "+ id +" not found. Unable to delete.");
            logger.info("[API-Store] deleteStore - END");
            return new ResponseEntity(new CustomErrorType("Store có mã: "+ id +" không tồn tại. Xóa Store không thành công."), HttpStatus.OK);
        }
        try {
            storeService.remove(store.get());
        }catch (Exception ex){
            return new ResponseEntity(new CustomErrorType("Tồn tại các cuốn sách thuộc Store này. Xóa Store không thành công."), HttpStatus.OK);
        }
        logger.info("[API-Store] deleteStore - SUCCESS");
        return new ResponseEntity(new CustomErrorType(true, "Xóa Store có mã:" + id + " - thành công."), HttpStatus.OK);
    }//delete 1 store

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateCat(@PathVariable("id") int id, @RequestBody StoreDto storeDto){
        logger.info("[API-Store] updateCat - START");
        logger.info("Fetching & Updating store with id: " + id);
        Store currStore = storeService.getStoreById(id).get();
        if(currStore == null){
            logger.error("Store with id:"+ id +" not found. Unable to update.");
            logger.info("[API-Store] updateCat - END");
            return new ResponseEntity(new CustomErrorType("Thể loại sách có mã: "+ id +" không tìm thấy. Cập nhật không thành công."),
                    HttpStatus.OK);
        }
        currStore.setAddress(storeDto.getAddress());
        //currStore.setNameCode(store.getNameCode());
        storeService.save(currStore);
        logger.info("[API-Store] updateCat - SUCCESS");
        return new ResponseEntity(new CustomErrorType("Cập nhật Store thành công."),
                HttpStatus.OK);
    }//form edit store, fill old data into form

}
