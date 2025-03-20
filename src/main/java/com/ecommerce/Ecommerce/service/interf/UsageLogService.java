package com.ecommerce.Ecommerce.service.interf;

import com.ecommerce.Ecommerce.dto.OrderDto;
import com.ecommerce.Ecommerce.entity.Order;
import com.ecommerce.Ecommerce.entity.OrderItem;
import com.ecommerce.Ecommerce.entity.Sales;
import com.ecommerce.Ecommerce.entity.UsageLog;
import com.ecommerce.Ecommerce.entity.User;
import com.ecommerce.Ecommerce.enums.OrderStatus;
import com.ecommerce.Ecommerce.entity.Item;
import com.ecommerce.Ecommerce.mapper.EntityMapper;
import com.ecommerce.Ecommerce.repository.OrderRepo;
import com.ecommerce.Ecommerce.repository.SalesRepo;
import com.ecommerce.Ecommerce.repository.UsageLogRepo;
import com.ecommerce.Ecommerce.repository.OrderItemRepo;
import com.ecommerce.Ecommerce.repository.ItemRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import org.joda.time.LocalDateTime;

@Service
public class UsageLogService {
    @Autowired
    private UsageLogRepo usageLogRepository;

    public void logAction(Long userId, String action) {
        UsageLog log = new UsageLog();
        log.setUserId(userId);
        log.setAction(action);
        log.setTimestamp(LocalDateTime.now());
        usageLogRepository.save(log);
    }

    public List<UsageLog> getUsageLogsByUser(Long userId) {
        return usageLogRepository.findByUserId(userId);
    }
}
