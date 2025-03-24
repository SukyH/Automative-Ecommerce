package com.ecommerce.Ecommerce.service.imp;

import com.ecommerce.Ecommerce.entity.Wishlist;
import com.ecommerce.Ecommerce.repository.WishlistRepo;
import com.ecommerce.Ecommerce.service.interf.WishlistService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
 
@Service
public class WishlistServiceImpl implements WishlistService {

    @Autowired
    private WishlistRepo wishlistRepository;

    // Add an item to wishlist
    @Override
    public void addToWishlist(Long userId, Long productId) {
        // Prevent duplicates
        if (wishlistRepository.findByUserIdAndProductId(userId, productId).isEmpty()) {
            Wishlist wishlist = new Wishlist();
            wishlist.setUserId(userId);
            wishlist.setProductId(productId);
            wishlist.setAddedDate(LocalDate.now());
            wishlistRepository.save(wishlist);
        } else {
            throw new RuntimeException("Product already in wishlist");
        }
    }

    // Get all items in a user's wishlist
    @Override
    public List<Wishlist> getWishlist(Long userId) {
        return wishlistRepository.findByUserId(userId);
    }

  
    @Override
    @Transactional
    public void removeFromWishlist(Long wishlistId) {
        if (wishlistRepository.existsById(wishlistId)) {
            wishlistRepository.deleteById(wishlistId);
        } else {
            throw new RuntimeException("Wishlist item not found");
        }
    }


}


