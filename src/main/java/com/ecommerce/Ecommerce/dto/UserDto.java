package com.ecommerce.Ecommerce.dto;

import java.util.List;

import org.joda.time.LocalDateTime;

import com.ecommerce.Ecommerce.dto.OrderItemDTO;
import com.ecommerce.Ecommerce.dto.AddressDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

	private Long id;
	private String name;
	private String email;
	private String phoneNumber;
	private String password;
	private String role;
	private List<OrderItemDTO> orderItemList;
	private AddressDto address;


	
}
