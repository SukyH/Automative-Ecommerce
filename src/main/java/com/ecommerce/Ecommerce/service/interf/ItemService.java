package com.ecommerce.Ecommerce.service.interf;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.Ecommerce.dto.ItemDto;
import com.ecommerce.Ecommerce.entity.Item;
import com.ecommerce.Ecommerce.entity.Review;

public interface ItemService {
	List<ItemDto> getAllItems(int page, int size);
	List<ItemDto> getItemsByBrand(String brand);
	List<ItemDto> getSortedItemsByPrice(String order);
	ItemDto getItemById(Long id);
	List<ItemDto> getSortedItemsByMileage(String order);
	List<ItemDto> getItemsByShape(String shape);
	List<ItemDto> getItemsByModelYear(Integer year);

	
	Item updateItem(ItemDto itemDto);
	List<ItemDto> getItemsByVehicleHistoryNoDamage();
	List<ItemDto> getItemsByVehicleHistoryWithDamage();

	List<ItemDto> searchItems(String searchValue);
	ItemDto getItemDetails(Long itemId);
	void deleteItem(Long itemId);
	List<ItemDto> filterItems(String brand, String shape, Integer modelYear, String vehicleHistory);
	Review addReview(Long itemId, int rating, String comment) ;


	
	List<Review> getItemReviews(Long itemId);
	Item createItem(ItemDto itemDto, MultipartFile imageFile);
	
}
