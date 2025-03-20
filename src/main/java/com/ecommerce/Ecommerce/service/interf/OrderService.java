package com.ecommerce.Ecommerce.service.interf;
import com.ecommerce.Ecommerce.dto.OrderDto;
import com.ecommerce.Ecommerce.entity.Item;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderService {
    List<OrderDto> getOrdersByUser(Long userId);
    OrderDto createOrder(Long userId);
    OrderDto addItemToOrder(Long orderId, Long itemId, int quantity);
    OrderDto removeItemFromOrder(Long orderId, Long orderItemId);
    OrderDto updateOrderStatus(Long orderItemId, String status);
	List<Item> getAllItemsInOrder(Long orderId);


}
