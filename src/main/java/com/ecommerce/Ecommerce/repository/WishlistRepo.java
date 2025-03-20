package com.ecommerce.Ecommerce.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.Ecommerce.entity.Payment;
import com.ecommerce.Ecommerce.entity.Wishlist;


public interface WishlistRepo extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUserId(Long userId);
}