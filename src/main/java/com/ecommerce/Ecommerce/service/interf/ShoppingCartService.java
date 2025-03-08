package com.ecommerce.Ecommerce.service.interf;

import com.ecommerce.Ecommerce.dto.ItemDto;
import com.ecommerce.Ecommerce.dto.ShoppingCartDTO;
import com.ecommerce.Ecommerce.dto.CategoryDto; // Import CategoryDto
import com.ecommerce.Ecommerce.entity.Category;
import com.ecommerce.Ecommerce.entity.Item;
import com.ecommerce.Ecommerce.entity.ShoppingCart;
import com.ecommerce.Ecommerce.entity.User;
import com.ecommerce.Ecommerce.repository.ItemRepo;
import com.ecommerce.Ecommerce.repository.ShoppingCartRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Service
public class ShoppingCartService {

    @Autowired
    private ShoppingCartRepo shoppingCartRepo;

    @Autowired
    private ItemRepo itemRepo;

    // Manually mapping ShoppingCart entity to ShoppingCartDTO
    public ShoppingCartDTO getCartByUserId(Long userId) {
        ShoppingCart cart = shoppingCartRepo.findByUserId(userId);
        if (cart != null) {
            return mapToDTO(cart);
        }
        return null; // or throw a custom exception
    }

    // Manually mapping ShoppingCart entity to ShoppingCartDTO and adding item to cart
    public ShoppingCartDTO addItemToCart(Long userId, Long itemId, int quantity) {
        ShoppingCart cart = shoppingCartRepo.findByUserId(userId);
        Item item = itemRepo.findById(itemId).orElseThrow(() -> new RuntimeException("Item not found"));

        if (cart == null) {
            // If cart does not exist, create a new cart for the user
            cart = new ShoppingCart();
            cart.setUser(new User()); // Set user by userId
            cart.setCreatedAt(LocalDateTime.now()); // Set creation time
        }

        // Add item to the cart (you should implement the logic for adding an item)
        cart.addItem(item, quantity); // Ensure addItem logic is correctly implemented in ShoppingCart entity

        shoppingCartRepo.save(cart); // Save cart to the repository
        return mapToDTO(cart); // Return DTO after saving
    }

    // Method to manually map ShoppingCart entity to ShoppingCartDTO
    private ShoppingCartDTO mapToDTO(ShoppingCart cart) {
        ShoppingCartDTO cartDTO = new ShoppingCartDTO();
        cartDTO.setCartID(cart.getCartID()); // Map cart ID
        cartDTO.setDate(cart.getCreatedAt()); // Map created date
        cartDTO.setUser(cart.getUser()); // Map user ID from User entity

        // Manually mapping List of Item entities to ItemDto
        cartDTO.setCartItemsList(cart.getCartItemsList().stream()
                .map(this::mapItemToDTO)
                .collect(Collectors.toList()));

        return cartDTO;
    }

    // Method to manually map Item entity to ItemDto
    private ItemDto mapItemToDTO(Item item) {
        ItemDto itemDto = new ItemDto();
        itemDto.setVid(item.getVid());
        itemDto.setName(item.getName());
        itemDto.setDescription(item.getDescription());
        itemDto.setBrand(item.getBrand());
        itemDto.setModel(item.getModel());
        itemDto.setImageUrl(item.getImageUrl());
        itemDto.setPrice(item.getPrice());
        itemDto.setQuantity(item.getQuantity());

        // Assuming CategoryDto has similar mapping logic
        itemDto.setCategory(mapCategoryToDTO(item.getCategory())); // Map category

        return itemDto;
    }

    // Method to manually map Category entity to CategoryDto
    private CategoryDto mapCategoryToDTO(Category category) {
        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setId(category.getId()); // Set category ID
        categoryDto.setName(category.getName()); // Set category name
        return categoryDto;
    }
}
