package com.ecommerce.Ecommerce.entity;
import java.math.BigDecimal;

import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters.LocalDateTimeConverter;

import com.ecommerce.Ecommerce.enums.UserRole;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="item")
public class Item {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
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
    @ElementCollection
    private List<String> reviews = new ArrayList<>();
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name= "category_id")
	private Category category;
	
	
	@ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
	
	@Column(name = "created_at")
	@CreationTimestamp
	@Convert(converter = LocalDateTimeConverter.class)
	private final LocalDateTime createdAt = LocalDateTime.now(); 
	
	
}
