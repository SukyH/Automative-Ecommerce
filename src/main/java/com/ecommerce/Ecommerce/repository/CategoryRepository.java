package com.ecommerce.Ecommerce.repository;

import com.ecommerce.Ecommerce.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    // You can add custom queries here if needed
    List<Category> findByName(String name);
}
