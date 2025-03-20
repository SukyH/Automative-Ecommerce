package com.ecommerce.Ecommerce.repository;
import com.ecommerce.Ecommerce.entity.Item;
import com.ecommerce.Ecommerce.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
    
    @Query("SELECT oi.item FROM OrderItem oi WHERE oi.order.id = :orderId")
    List<Item> findItemsByOrderId(@Param("orderId") Long orderId);
    
    @Query("SELECT YEAR(o.createdAt) as year, MONTH(o.createdAt) as month, COUNT(o) as orderCount " +
            "FROM Order o GROUP BY YEAR(o.createdAt), MONTH(o.createdAt) ORDER BY year, month")
    List<Map<String, Object>> countOrdersPerMonth();
    

}
