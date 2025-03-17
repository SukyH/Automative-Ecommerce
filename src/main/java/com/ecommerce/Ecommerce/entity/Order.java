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
@Table(name = "`order`")

public class Order {
	
	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderID;


    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<OrderItem> orderItems = new HashSet<>();


    private LocalDateTime createdAt;

}
