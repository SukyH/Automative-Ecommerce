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
import com.ecommerce.Ecommerce.entity.OrderItem;
import com.ecommerce.Ecommerce.entity.Address;

@Data
@Entity
@Table(name = "user")
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
    @NotBlank(message = "Name is required")
	private String name;
	
    @Column(unique = true)
    @NotBlank(message = "Email is required")
	private String email;
    
    @NotBlank(message = "Password is required")
	private String password;
	
	@Column(name = "phone_number")
	@NotBlank(message = "Phone number is required")
	private String phoneNumber;
	
	private UserRole role;
	
	@OneToMany(mappedBy = "user",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<OrderItem> orderItemList;
	
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Address Address;

	@Column(name = "created_at")
	private final LocalDateTime createdAt = LocalDateTime.now(); 
	
}
