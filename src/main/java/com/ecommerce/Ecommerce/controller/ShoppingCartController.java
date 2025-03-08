package com.ecommerce.Ecommerce.controller;

import com.ecommerce.Ecommerce.dto.ShoppingCartDTO;
import com.ecommerce.Ecommerce.service.interf.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class ShoppingCartController {
    @Autowired private ShoppingCartService shoppingCartService;

    @GetMapping("/user/{userId}")
    public ShoppingCartDTO getCart(@PathVariable Long userId) {
        return shoppingCartService.getCartByUserId(userId);
    }

    @PostMapping("/user/{userId}")
    public ShoppingCartDTO createCart(@PathVariable Long userId) {
        return shoppingCartService.createCartForUser(userId);
    }
}