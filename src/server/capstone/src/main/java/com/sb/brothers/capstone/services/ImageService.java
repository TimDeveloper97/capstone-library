package com.sb.brothers.capstone.services;

import com.sb.brothers.capstone.entities.Image;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public interface ImageService {
    Set<Image> getImagesByBookId(int bookId);

    Image findImageById(int id);

    void update(Image image);
}
