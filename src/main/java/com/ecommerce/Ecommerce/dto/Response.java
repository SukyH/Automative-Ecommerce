package com.ecommerce.Ecommerce.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@Builder
public class Response {
	
	private int status;
	private String message;
	private final LocalDateTime time = LocalDateTime.now();
	
	private String token;
	private String role;
	private String expirationTime;
	
	private int AllPages;
	private long AllElement;
	
	private UserDto user;
	private List<UserDto> userList;
	
	private CategoryDto category;
	private List<CategoryDto> categoryList;
	
	private ItemDto item;
	private List<ItemDto> itemList;
	
	private OrderItemDTO orderItem;
	private List<OrderItemDTO> orderItemList;
	

}
