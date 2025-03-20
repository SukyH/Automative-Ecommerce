package com.ecommerce.Ecommerce.repository;
import com.ecommerce.Ecommerce.entity.Item;
import com.ecommerce.Ecommerce.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
    
    @Query("SELECT o.items FROM Order o WHERE o.id = :orderId")
    List<Item> findItemsByOrderId(@Param("orderId") Long orderId);
}
