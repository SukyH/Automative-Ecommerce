// 3. ShoppingCart Repository
package com.ecommerce.Ecommerce.repository;

import com.ecommerce.Ecommerce.entity.ShoppingCart;
import com.ecommerce.Ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShoppingCartRepo extends JpaRepository<ShoppingCart, Long> {
    ShoppingCart findByUserId(Long userId);

    boolean existsByUser(User user);
}