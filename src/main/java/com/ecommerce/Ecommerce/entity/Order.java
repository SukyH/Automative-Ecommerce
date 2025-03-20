package com.ecommerce.Ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import com.ecommerce.Ecommerce.enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonManagedReference;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "`order`")

public class Order {
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderID;


    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Set<OrderItem> orderItems = new HashSet<>();
    @Enumerated(EnumType.STRING)  
    private OrderStatus status = OrderStatus.PROCESSED;  // Default status
       
    
    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    private List<Item> items;

    // Getter and setter methods
    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
    private LocalDateTime createdAt;

}
