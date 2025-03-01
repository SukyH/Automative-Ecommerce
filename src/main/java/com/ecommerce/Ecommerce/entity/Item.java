package com.ecommerce.Ecommerce.entity;
import java.math.BigDecimal;

import org.joda.time.LocalDateTime;

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
	private String Model;
	private String imageUrl;
	private BigDecimal price;
	private Integer quantity;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name= "category_id")
	private Category category;
	
	
	@Column(name = "created_at")
	private final LocalDateTime createdAt = LocalDateTime.now(); 
	
	
}
