package com.ecommerce.Ecommerce.dto;

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
public class PaymentDto {


	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int cardNum;
	private int securityCode;
	private String expirationDate;
	private String holderName;
	
	private LocalDateTime createdAt;// not sure if we want to keep track
	

}
