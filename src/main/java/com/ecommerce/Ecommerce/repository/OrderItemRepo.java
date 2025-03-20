package com.ecommerce.Ecommerce.repository;

import com.ecommerce.Ecommerce.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface OrderItemRepo extends JpaRepository<OrderItem, Long> {
    List<OrderItem> findByOrderOrderID(Long orderID);
    
    @Query("SELECT YEAR(o.createdAt) as year, MONTH(o.createdAt) as month, i.item.name as itemName, SUM(i.quantity) as totalQuantity " +
            "FROM OrderItem i JOIN i.order o " +
            "GROUP BY YEAR(o.createdAt), MONTH(o.createdAt), i.item.name " +
            "ORDER BY year, month, totalQuantity DESC")
    List<Map<String, Object>> countItemsPerMonth();
    
    @Query("SELECT YEAR(o.createdAt) as year, MONTH(o.createdAt) as month, " +
            "i.item.name as itemName, SUM(i.quantity) as totalQuantity, " +
            "CAST(SUM(i.quantity * i.item.price) AS java.math.BigDecimal) as totalSales " +
            "FROM OrderItem i JOIN i.order o " +
            "GROUP BY YEAR(o.createdAt), MONTH(o.createdAt), i.item.name " +
            "ORDER BY year, month, totalSales DESC")
    List<Map<String, Object>> countItemsPerMonthWithSales();
}