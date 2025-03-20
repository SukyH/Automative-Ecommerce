package com.ecommerce.Ecommerce.dto;
import java.math.BigDecimal;

import org.joda.time.LocalDateTime;

import com.ecommerce.Ecommerce.dto.UserDto;
import com.ecommerce.Ecommerce.entity.Category;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor

public class ItemDto {
	 private Long vid;
	    private String name;
	    private String description;
	    private String brand;
	    private String model;
	    private String imageUrl;
	    private BigDecimal price;
	    private Integer quantity;
	    private Integer mileage; 
	    private String shape;  
	    private Integer modelYear;  
	    private String vehicleHistory;  
	    private String interiorColor;
	    private String exteriorColor;
	    private String fabric;

	
	
}
