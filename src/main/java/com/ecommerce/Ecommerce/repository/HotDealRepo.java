package com.ecommerce.Ecommerce.repository;

import com.ecommerce.Ecommerce.entity.HotDeal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HotDealRepo extends JpaRepository<HotDeal, Long> {
    List<HotDeal> findAllByOrderByCreatedAtDesc();
}
