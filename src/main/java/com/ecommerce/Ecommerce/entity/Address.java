package com.ecommerce.Ecommerce.entity;
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
@Table(name="address")
public class Address {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String street;
	private String city;
	private String country;
	private String zipcode;
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name= "user_id")
	private User user;

	@Column(name = "created_at")
	private final LocalDateTime createdAt = LocalDateTime.now(); 

}
