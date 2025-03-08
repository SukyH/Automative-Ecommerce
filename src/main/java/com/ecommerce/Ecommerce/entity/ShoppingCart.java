package com.ecommerce.Ecommerce.entity;
import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;


public class ShoppingCart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long CartID;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")// user id
    private User user;

    private List<Item> cartItemsList;

    public Long getCartID() {
        return CartID;
    }

    public void setCartID(Long cartID) {
        CartID = cartID;
    }

    public List<Item> getCartItemsList() {
        return cartItemsList;
    }

    public void setCartItemsList(List<Item> cartItemsList) {
        this.cartItemsList = cartItemsList;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now(); // Timestamp when the cart was created


    public void addItem(Item item, int quantity) {
    }
}
