package com.ecommerce.Ecommerce.repository;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.Ecommerce.entity.Payment;
import com.ecommerce.Ecommerce.entity.Sales;


public interface SalesRepo extends JpaRepository<Sales, Long> {
    List<Sales> findBySaleDateBetween(LocalDate startDate, LocalDate endDate);
    List<Sales> findByProductId(Long productId);
}