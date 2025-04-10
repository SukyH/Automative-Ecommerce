package com.ecommerce.Ecommerce.entity;
import java.math.BigDecimal;

import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters.LocalDateTimeConverter;

import com.ecommerce.Ecommerce.enums.UserRole;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
    
    @OneToMany(mappedBy = "item", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Review> reviews = new ArrayList<>();


	
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
	
	@Column(name = "interior_color")
	private String interiorColor;

	@Column(name = "exterior_color")
	private String exteriorColor;

	@Column(name = "fabric")
	private String fabric;

}
