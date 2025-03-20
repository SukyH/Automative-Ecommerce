package com.ecommerce.Ecommerce.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.Ecommerce.entity.Payment;
import com.ecommerce.Ecommerce.entity.UsageLog;


public interface UsageLogRepo extends JpaRepository<UsageLog, Long> {
    List<UsageLog> findByUserId(Long userId);
}
