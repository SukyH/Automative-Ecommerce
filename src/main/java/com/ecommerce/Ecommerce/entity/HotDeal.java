package com.ecommerce.Ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "hot_deal")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HotDeal {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;  // Reference the Item entity, not just itemId

    @Column(name = "discount_percentage", nullable = false)
    private BigDecimal discountPercentage;


    @Column(name = "created_at", nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private LocalDateTime createdAt;
}
