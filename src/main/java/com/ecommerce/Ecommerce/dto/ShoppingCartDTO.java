package com.ecommerce.Ecommerce.dto;

import com.ecommerce.Ecommerce.entity.User;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class ShoppingCartDTO {
    private Long CartID;

    private UserDto user;

    private List<ItemDto> cartItemsList;

    private LocalDateTime date; // Creation date of the cart (or last update date)

    public Long getCartID() {
        return CartID;
    }

    public void setCartID(Long cartID) {
        CartID = cartID;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public List<ItemDto> getCartItemsList() {
        return cartItemsList;
    }

    public void setCartItemsList(List<ItemDto> cartItemsList) {
        this.cartItemsList = cartItemsList;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
