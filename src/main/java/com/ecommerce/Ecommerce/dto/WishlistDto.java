package com.ecommerce.Ecommerce.dto;

import java.time.LocalDate;

import org.joda.time.LocalDateTime;

import com.ecommerce.Ecommerce.dto.UserDto;
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
public class WishlistDto {


	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long wishlistId;
    private Long userId;
    private Long productId;
    private LocalDate addedDate;

	
	private LocalDateTime createdAt;// not sure if we want to keep track
	

}
