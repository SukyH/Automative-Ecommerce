package com.ecommerce.Ecommerce.dto;

import java.time.LocalDate;

import org.joda.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
public class SalesDto {


	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long saleId;

    private Long productId;
    private Long customerId;
    private int quantity;
    private double totalPrice;
    private LocalDate saleDate;
	
	private LocalDateTime createdAt;
	

}
