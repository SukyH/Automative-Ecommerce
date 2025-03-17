package com.ecommerce.Ecommerce.controller;

import com.ecommerce.Ecommerce.dto.OrderDto;
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
}
