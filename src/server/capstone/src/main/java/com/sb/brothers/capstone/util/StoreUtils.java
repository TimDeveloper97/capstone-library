package com.sb.brothers.capstone.util;

import com.sb.brothers.capstone.configuration.BeanClass;
import com.sb.brothers.capstone.entities.Store;
import com.sb.brothers.capstone.entities.User;
import com.sb.brothers.capstone.services.StoreService;
import com.sb.brothers.capstone.services.UserService;

import java.util.List;
import java.util.Optional;

public class StoreUtils {

    private static StoreService storeService = BeanClass.getBean(StoreService.class);

    private static UserService userService = BeanClass.getBean(UserService.class);

    /**
     *
     * @param address
     * @return id of store if found else return -1
     */
    public static int findStoreIdByAddress(String address){
        Optional<Store> opStore = storeService.getStoreByAddress(address);
        return opStore.isPresent() ? opStore.get().getId() : -1;
    }

    public static boolean findManagerByStoreId(int storeId, String userId){
        List<User> managers = null;
        try {
            managers = userService.findManagerByStoreId(storeId);
        }
        catch (Exception e){
            return false;
        }
        for (User user : managers){
            if(user.getId().compareTo(userId) == 0){
                return true;
            }
        }
        return false;
    }

    public static int setRandomStoreForManager(User user){
        List<Store> stores = storeService.getAll();
        for(Store store : stores) {
            if(store.getUsers() == null || store.getUsers().isEmpty()){
                return store.getId();
            }
        }
        return -1;
    }
}
