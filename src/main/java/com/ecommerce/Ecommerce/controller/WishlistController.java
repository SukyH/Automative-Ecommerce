
package com.ecommerce.Ecommerce.controller;

import com.ecommerce.Ecommerce.dto.ItemDto;
import com.ecommerce.Ecommerce.dto.OrderDto;
import com.ecommerce.Ecommerce.entity.Item;
import com.ecommerce.Ecommerce.entity.Sales;
import com.ecommerce.Ecommerce.entity.Wishlist;
import com.ecommerce.Ecommerce.repository.ItemRepo;
import com.ecommerce.Ecommerce.service.interf.ItemService;
import com.ecommerce.Ecommerce.service.interf.SalesService;
import com.ecommerce.Ecommerce.service.interf.WishlistService;
import com.ecommerce.Ecommerce.service.AwsS3Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("wishlist")
public class WishlistController {
    @Autowired
    private WishlistService wishlistService;

    @PostMapping("/add")
    public ResponseEntity<String> addToWishlist(@RequestBody Map<String, Long> request) {
        Long userId = request.get("userId");
        Long productId = request.get("productId");

        if (userId == null || productId == null) {
            return ResponseEntity.badRequest().body("Missing userId or productId");
        }

        wishlistService.addToWishlist(userId, productId);
        return ResponseEntity.ok("{\"message\": \"Product added to wishlist\"}");
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Wishlist>> getWishlist(@PathVariable Long userId) {
        List<Wishlist> wishlist = wishlistService.getWishlist(userId);
        return ResponseEntity.ok(wishlist);
    }
    
    @DeleteMapping("/{productId}")
    public ResponseEntity<String> removeFromWishlist(@PathVariable Long productId, @RequestParam Long userId) {
        wishlistService.removeFromWishlist(userId, productId);
        return ResponseEntity.ok("Product removed from wishlist");
    }

}
    
