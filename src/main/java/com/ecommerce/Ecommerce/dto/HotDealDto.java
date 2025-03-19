package com.ecommerce.Ecommerce.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HotDealDto {
    
    private Long id;
    private ItemDto item; // Includes all item details
    private BigDecimal discountPercentage;
    private LocalDateTime createdAt;
}
