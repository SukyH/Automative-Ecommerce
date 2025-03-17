package com.ecommerce.Ecommerce.service.interf;

import java.util.List;
import com.ecommerce.Ecommerce.dto.ItemDto;
import com.ecommerce.Ecommerce.entity.Item;

public interface ItemService {
    List<ItemDto> getAllItems();
    List<ItemDto> getItemsByBrand(String brand);
    List<ItemDto> getSortedItemsByPrice(String order);
    ItemDto getItemById(Long id);
    List<ItemDto> getSortedItemsByMileage(String order);
	List<ItemDto> getItemsByShape(String shape);
	List<ItemDto> getItemsByModelYear(Integer year);
	List<ItemDto> getItemsByVehicleHistory(String history);
	Item createItem(ItemDto itemDto);
	Item updateItem(ItemDto itemDto);
}
