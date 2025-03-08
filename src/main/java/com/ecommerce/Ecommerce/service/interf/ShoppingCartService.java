package com.ecommerce.Ecommerce.service.interf;

import com.ecommerce.Ecommerce.dto.ShoppingCartDTO;
import com.ecommerce.Ecommerce.entity.ShoppingCart;
import com.ecommerce.Ecommerce.repository.ShoppingCartRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShoppingCartService {

    @Autowired
    private ShoppingCartRepo shoppingCartRepo;

    @Autowired
    private ModelMapper modelMapper;

    // Convert ShoppingCart Entity to DTO
    public ShoppingCartDTO getCartByUserId(Long userId) {
        ShoppingCart cart = shoppingCartRepo.findByUserId(userId);
        if (cart != null) {
            return modelMapper.map(cart, ShoppingCartDTO.class); // Use ModelMapper to map
        }
        return null;
    }

    // Add item to the cart and return updated DTO
    public ShoppingCartDTO addItemToCart(Long userId, Long itemId, int quantity) {
        ShoppingCart cart = shoppingCartRepo.findByUserId(userId);
        // Your logic to fetch Item and add it to the cart
        // For now, let's assume the Item and quantity are added correctly

        shoppingCartRepo.save(cart);
        return modelMapper.map(cart, ShoppingCartDTO.class); // Map to DTO
    }
}
