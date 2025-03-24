package com.ecommerce.Ecommerce.dto;

import com.ecommerce.Ecommerce.entity.OrderItem;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Data

@Getter
@Setter

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {

    private Long orderID;
    private Long userId;
    private LocalDateTime createdAt;
    private Set<OrderItem> orderItems;
    private String status;


}
