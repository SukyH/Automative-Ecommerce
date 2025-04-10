package com.ecommerce.Ecommerce.dto;
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
public class OrderItemDTO {
    private Long orderItemid;
    private Long orderID;
    private Long itemId;
    private int quantity;
}
