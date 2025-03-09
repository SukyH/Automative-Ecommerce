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

    @JoinColumn(name = "user_id", nullable = false)
    private Long userId;

    @OneToMany(mappedBy = "shoppingCart", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<OrderItem> orderItems = new HashSet<>();

    private LocalDateTime createdAt;

    public void addItem(Item item, int quantity) {
        for (OrderItem OrderItem : orderItems) {
            if (OrderItem.getItem().getVid().equals(item.getVid())) {
                OrderItem.setQuantity(OrderItem.getQuantity() + quantity);
                return;
            }
        }
        OrderItem newCartItem = new OrderItem(this, item, quantity);
        orderItems.add(newCartItem);
    }

    public void removeItem(Long itemId) {
        orderItems.removeIf(cartItem -> cartItem.getItem().getVid().equals(itemId));
    }

    public void updateItemQuantity(Long itemId, int quantity) {
        Iterator<OrderItem> iterator = orderItems.iterator();
        while (iterator.hasNext()) {
            OrderItem orderItem = iterator.next();
            if (orderItem.getItem().getVid().equals(itemId)) {
                if (quantity <= 0) {
                    iterator.remove();
                } else {
                    orderItem.setQuantity(quantity);
                }
                return;
            }
        }
    }

    public void clearItems() {
        orderItems.clear();
    }
}
