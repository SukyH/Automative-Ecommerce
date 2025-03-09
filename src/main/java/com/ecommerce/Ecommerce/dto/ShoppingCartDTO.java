package com.ecommerce.Ecommerce.dto;

import com.ecommerce.Ecommerce.entity.OrderItem;
import lombok.*;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingCartDTO {
    private Long cartID;
    private Long userId;
    private LocalDateTime createdAt;
    private Set<OrderItem> orderItems;
}
