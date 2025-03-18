
package com.ecommerce.Ecommerce.entity;
import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters.LocalDateTimeConverter;

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
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Order> orders;
	
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
	
	
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL,mappedBy = "user")
	private Address Address;

	
    @CreationTimestamp
	@Column(name = "created_at", nullable = false, updatable = false)
	@Convert(converter = LocalDateTimeConverter.class)
	private LocalDateTime createdAt;

	
}
