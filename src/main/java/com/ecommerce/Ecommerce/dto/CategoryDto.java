package com.ecommerce.Ecommerce.dto;

import java.util.List;

import lombok.*;
import org.joda.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {
	private Long id;
	private String name;
	private List<ItemDto>  itemList;
}
