package com.ecommerce.Ecommerce.controller;

import com.ecommerce.Ecommerce.dto.ShoppingCartDTO;
import com.ecommerce.Ecommerce.service.interf.ShoppingCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @GetMapping("/{userId}")
    public ResponseEntity<ShoppingCartDTO> getCartByUserId(@PathVariable Long userId) {
        ShoppingCartDTO cartDTO = shoppingCartService.getCartByUserId(userId);
        if (cartDTO != null) {
            return ResponseEntity.ok(cartDTO);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PostMapping("/{userId}/add")
    public ResponseEntity<ShoppingCartDTO> addItemToCart(
            @PathVariable Long userId,
            @RequestParam Long itemId,
            @RequestParam int quantity) {
        ShoppingCartDTO updatedCart = shoppingCartService.addItemToCart(userId, itemId, quantity);
        return ResponseEntity.ok(updatedCart);
    }

    // Other endpoints
}
