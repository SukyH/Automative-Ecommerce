package com.ecommerce.Ecommerce.service.interf;

import com.ecommerce.Ecommerce.dto.OrderDto;
import com.ecommerce.Ecommerce.entity.Order;
import com.ecommerce.Ecommerce.entity.OrderItem;
import com.ecommerce.Ecommerce.entity.Sales;
import com.ecommerce.Ecommerce.entity.User;
import com.ecommerce.Ecommerce.enums.OrderStatus;
import com.ecommerce.Ecommerce.entity.Item;
import com.ecommerce.Ecommerce.mapper.EntityMapper;
import com.ecommerce.Ecommerce.repository.OrderRepo;
import com.ecommerce.Ecommerce.repository.SalesRepo;
import com.ecommerce.Ecommerce.repository.OrderItemRepo;
import com.ecommerce.Ecommerce.repository.ItemRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SalesService {
    @Autowired
    private SalesRepo salesRepository;

    public List<Sales> getSalesByDateRange(LocalDate startDate, LocalDate endDate) {
        return salesRepository.findBySaleDateBetween(startDate, endDate);
    }

    public List<Sales> getSalesByProduct(Long productId) {
        return salesRepository.findByProductId(productId);
    }
}
