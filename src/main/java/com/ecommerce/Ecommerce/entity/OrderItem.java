package com.ecommerce.Ecommerce.entity;

import jakarta.persistence.*;

import lombok.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "order_item")

public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderitemsid;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;
    


    private int quantity;

    public OrderItem(Order order, Item item, int quantity) {
        this.order = order;
        this.item = item;
        this.quantity = quantity;
    }

}
