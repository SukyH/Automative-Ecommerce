package com.ecommerce.Ecommerce.repository;

import com.ecommerce.Ecommerce.entity.Review;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByItemVid(Long itemId);
}
