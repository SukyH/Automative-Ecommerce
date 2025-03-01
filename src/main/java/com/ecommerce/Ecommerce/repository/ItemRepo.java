package com.ecommerce.Ecommerce.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.Ecommerce.entity.Item;

public interface ItemRepo extends JpaRepository<Item, Long> {
    List<Item> findByCategoryId(Long categoryId);
    List<Item> findByNameContainingOrDescriptionContaining(String name,String description);
}

