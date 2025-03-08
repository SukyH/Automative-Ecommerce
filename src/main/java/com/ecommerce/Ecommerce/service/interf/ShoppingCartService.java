package com.ecommerce.Ecommerce.service.interf;
import com.ecommerce.Ecommerce.dto.ShoppingCartDTO;
import com.ecommerce.Ecommerce.dto.ItemDto;
import com.ecommerce.Ecommerce.entity.ShoppingCart;
import com.ecommerce.Ecommerce.entity.Item;
import com.ecommerce.Ecommerce.entity.User;
import com.ecommerce.Ecommerce.repository.ShoppingCartRepo;
import com.ecommerce.Ecommerce.repository.ItemRepo;
import com.ecommerce.Ecommerce.repository.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ShoppingCartService {

    @Autowired
    private ShoppingCartRepo shoppingCartRepo;

    @Autowired
    private ItemRepo itemRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;

    public ShoppingCartDTO getCartByUserId(Long userId) {
        ShoppingCart cart = shoppingCartRepo.findByUserId(userId);
        if (cart != null) {
            return modelMapper.map(cart, ShoppingCartDTO.class);
        }
        return null;
    }

    @Transactional
    public ShoppingCartDTO addItemToCart(Long userId, Long itemId, int quantity) {
        ShoppingCart cart = shoppingCartRepo.findByUserId(userId);
        Item item = itemRepo.findById(itemId).orElseThrow(() -> new RuntimeException("Item not found"));

        if (cart == null) {
            cart = new ShoppingCart();
            cart.setUserId(userRepo.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"))
                    .getId()); // Extract the ID instead of passing the full User object
            cart.setCreatedAt(LocalDateTime.now());
        }

        cart.addItem(item, quantity);
        shoppingCartRepo.save(cart);
        return modelMapper.map(cart, ShoppingCartDTO.class);
    }

    @Transactional
    public ShoppingCartDTO removeItemFromCart(Long userId, Long itemId) {
        ShoppingCart cart = shoppingCartRepo.findByUserId(userId);
        if (cart == null) {
            throw new RuntimeException("Shopping cart not found");
        }

        cart.removeItem(itemId);
        shoppingCartRepo.save(cart);
        return modelMapper.map(cart, ShoppingCartDTO.class);
    }

    @Transactional
    public ShoppingCartDTO updateItemQuantity(Long userId, Long itemId, int quantity) {
        ShoppingCart cart = shoppingCartRepo.findByUserId(userId);
        if (cart == null) {
            throw new RuntimeException("Shopping cart not found");
        }

        cart.updateItemQuantity(itemId, quantity);
        shoppingCartRepo.save(cart);
        return modelMapper.map(cart, ShoppingCartDTO.class);
    }

    @Transactional
    public void clearCart(Long userId) {
        ShoppingCart cart = shoppingCartRepo.findByUserId(userId);
        if (cart != null) {
            cart.clearItems();
            shoppingCartRepo.save(cart);
        }
    }

    public ShoppingCartDTO createCartForUser(Long userId) {
        // Fetch the user from the database
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if the user already has a cart
        if (shoppingCartRepo.existsByUser(user)) {
            throw new RuntimeException("User already has a shopping cart");
        }

        // Create a new ShoppingCart
        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.setUserId(user.getId());
        shoppingCart.setCreatedAt(LocalDateTime.now());

        // Save the new cart to the database
        shoppingCart = shoppingCartRepo.save(shoppingCart);

        // Convert to DTO and return
        return modelMapper.map(shoppingCart, ShoppingCartDTO.class);
    }
}

