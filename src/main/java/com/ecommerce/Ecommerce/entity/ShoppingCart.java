package com.ecommerce.Ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingCart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cartID;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "shoppingCart", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CartItem> cartItems = new HashSet<>();

    private LocalDateTime createdAt;

    public void addItem(Item item, int quantity) {
        for (CartItem cartItem : cartItems) {
            if (cartItem.getItem().getVid().equals(item.getVid())) {
                cartItem.setQuantity(cartItem.getQuantity() + quantity);
                return;
            }
        }
        CartItem newCartItem = new CartItem(this, item, quantity);
        cartItems.add(newCartItem);
    }

    public void removeItem(Long itemId) {
        cartItems.removeIf(cartItem -> cartItem.getItem().getVid().equals(itemId));
    }

    public void updateItemQuantity(Long itemId, int quantity) {
        Iterator<CartItem> iterator = cartItems.iterator();
        while (iterator.hasNext()) {
            CartItem cartItem = iterator.next();
            if (cartItem.getItem().getVid().equals(itemId)) {
                if (quantity <= 0) {
                    iterator.remove();
                } else {
                    cartItem.setQuantity(quantity);
                }
                return;
            }
        }
    }

    public void clearItems() {
        cartItems.clear();
    }
}
