package com.ecommerce.Ecommerce.service.imp;

import com.ecommerce.Ecommerce.dto.OrderDto;
import com.ecommerce.Ecommerce.entity.Order;
import com.ecommerce.Ecommerce.entity.OrderItem;
import com.ecommerce.Ecommerce.entity.User;
import com.ecommerce.Ecommerce.entity.Item;
import com.ecommerce.Ecommerce.mapper.EntityMapper;
import com.ecommerce.Ecommerce.repository.OrderRepo;
import com.ecommerce.Ecommerce.repository.OrderItemRepo;
import com.ecommerce.Ecommerce.repository.ItemRepo;
import com.ecommerce.Ecommerce.service.interf.OrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepo orderRepository;
    private final OrderItemRepo orderItemRepository;
    private final ItemRepo itemRepository;
    private final EntityMapper orderMapper;

    public OrderServiceImpl(OrderRepo orderRepository, OrderItemRepo orderItemRepository,
                            ItemRepo itemRepository, EntityMapper orderMapper) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.itemRepository = itemRepository;
        this.orderMapper = orderMapper;
    }

    @Override
    public List<OrderDto> getOrdersByUser(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orderMapper.ordersToOrderDtos(orders);
    }

    @Override
    @Transactional
    public OrderDto createOrder(Long userId) {
        User user = new User();
        user.setId(userId); 
        Order order = new Order();
        order.setUser(user); 
        order.setCreatedAt(LocalDateTime.now());
        Order savedOrder = orderRepository.save(order);
        return orderMapper.orderToOrderDto(savedOrder);
    }

    @Override
    @Transactional
    public OrderDto addItemToOrder(Long orderId, Long itemId, int quantity) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));
        
        Item item = itemRepository.findById(itemId)
            .orElseThrow(() -> new RuntimeException("Item not found"));

        OrderItem orderItem = new OrderItem(order, item, quantity);
        orderItemRepository.save(orderItem);

        return orderMapper.orderToOrderDto(order);
    }


    @Override
    @Transactional
    public OrderDto removeItemFromOrder(Long orderId, Long orderItemId) {
        OrderItem orderItem = orderItemRepository.findById(orderItemId)
                .orElseThrow(() -> new RuntimeException("Order Item not found"));

        if (!orderItem.getOrder().getOrderID().equals(orderId)) {
            throw new RuntimeException("Order Item does not belong to the given Order.");
        }

        orderItemRepository.delete(orderItem);
        return orderMapper.orderToOrderDto(orderItem.getOrder());
    }
}
