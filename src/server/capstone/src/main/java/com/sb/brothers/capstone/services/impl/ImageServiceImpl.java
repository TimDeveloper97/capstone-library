package com.sb.brothers.capstone.services.impl;

import com.sb.brothers.capstone.entities.Image;
import com.sb.brothers.capstone.repositories.ImageRepository;
import com.sb.brothers.capstone.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class ImageServiceImpl implements ImageService {

    @Autowired
    ImageRepository imageRepository;

    @Override
    public Set<Image> getImagesByBookId(int bookId) {
        return imageRepository.getImagesByBookId(bookId);
    }

    @Override
    public Image findImageById(int id) {
        return imageRepository.findImageById(id);
    }

    @Override
    public void update(Image image) {
        imageRepository.saveAndFlush(image);
    }
}
