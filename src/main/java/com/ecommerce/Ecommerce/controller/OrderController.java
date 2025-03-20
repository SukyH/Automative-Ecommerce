package com.ecommerce.Ecommerce.controller;

import com.ecommerce.Ecommerce.dto.OrderDto;
import com.ecommerce.Ecommerce.entity.Item;
import com.ecommerce.Ecommerce.service.interf.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    @GetMapping("/{orderId}/items")
    public ResponseEntity<List<Item>> getAllItemsInOrder(@PathVariable Long orderId) {
        List<Item> items = orderService.getAllItemsInOrder(orderId);
        if (items.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(items);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDto>> getOrdersByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getOrdersByUser(userId));
    }

    @PostMapping("/create/{userId}")
    public ResponseEntity<OrderDto> createOrder(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.createOrder(userId));
    }

    @PostMapping("/{orderId}/add-item/{itemId}")
    public ResponseEntity<OrderDto> addItemToOrder(
            @PathVariable Long orderId,
            @PathVariable Long itemId,
            @RequestParam int quantity) {
        return ResponseEntity.ok(orderService.addItemToOrder(orderId, itemId, quantity));
    }

    @DeleteMapping("/{orderId}/remove-item/{orderItemId}")
    public ResponseEntity<OrderDto> removeItemFromOrder(
            @PathVariable Long orderId,
            @PathVariable Long orderItemId) {
        return ResponseEntity.ok(orderService.removeItemFromOrder(orderId, orderItemId));
    }
  
    @PutMapping("/update-status/{orderId}")
    public ResponseEntity<OrderDto> updateOrderStatus(
            @PathVariable Long orderId,       // Path variable for order ID
            @RequestParam String status) {    // Request parameter for new status

        try {
            // Call the service to update the order status
            OrderDto updatedOrder = orderService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok(updatedOrder); // Return the updated order
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null); // Return bad request on failure
        }
    }
}
