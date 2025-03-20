package com.ecommerce.Ecommerce.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.Ecommerce.entity.Payment;
import com.ecommerce.Ecommerce.entity.Wishlist;


public interface WishlistRepo extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUserId(Long userId);

    Optional<Wishlist> findByUserIdAndProductId(Long userId, Long productId);

    void deleteByUserIdAndProductId(Long userId, Long productId);
}