package com.ecommerce.Ecommerce.repository;

import com.ecommerce.Ecommerce.entity.Address;
import com.ecommerce.Ecommerce.entity.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingCartRepo extends JpaRepository<ShoppingCart, Long> {
    ShoppingCart findByUserId(Long userId);
}
