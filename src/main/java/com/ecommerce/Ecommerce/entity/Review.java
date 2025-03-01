package com.ecommerce.Ecommerce.entity;

import java.util.List;

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
@Table(name="review")
public class Review {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String content;
	private int rating;//1 to 5 stars
	
	@ManyToOne
	@JoinColumn(name = "item_id")
	private Item item;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@Column(name = "created_at")
	private final LocalDateTime createdAt = LocalDateTime.now(); 
	
	

}
