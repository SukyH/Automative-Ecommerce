package com.ecommerce.Ecommerce.service.imp;

import com.ecommerce.Ecommerce.dto.ItemDto;
import com.ecommerce.Ecommerce.entity.Item;
import com.ecommerce.Ecommerce.repository.ItemRepo;
import com.ecommerce.Ecommerce.service.interf.ItemService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService {

	@Autowired
	private ItemRepo itemRepo;


	@Override
	public Item createItem(ItemDto itemDto) {
		// Logic to create item
		Item item = new Item();
		item.setName(itemDto.getName());
		item.setDescription(itemDto.getDescription());
		item.setBrand(itemDto.getBrand());
		item.setModel(itemDto.getModel());
		item.setImageUrl(itemDto.getImageUrl());
		item.setPrice(itemDto.getPrice());
		item.setQuantity(itemDto.getQuantity());
		item.setMileage(itemDto.getMileage()); 
		item.setShape(itemDto.getShape());
		item.setModelYear(itemDto.getModelYear());
		item.setVehicleHistory(itemDto.getVehicleHistory());
		item.setInteriorColor(itemDto.getInteriorColor());
		item.setExteriorColor(itemDto.getExteriorColor());
		item.setFabric(itemDto.getFabric());

		// Set other fields as needed, then save it to DB
		return itemRepo.save(item);
	}

	@Override
	public Item updateItem(ItemDto itemDto) {
		// Fetch existing item from DB
		Item existingItem = itemRepo.findById(itemDto.getVid()).orElseThrow(() -> new RuntimeException("Item not found"));

		// Update item properties
		existingItem.setName(itemDto.getName());
		existingItem.setDescription(itemDto.getDescription());
		existingItem.setBrand(itemDto.getBrand());
		existingItem.setModel(itemDto.getModel());
		existingItem.setImageUrl(itemDto.getImageUrl());
		existingItem.setPrice(itemDto.getPrice());
		existingItem.setQuantity(itemDto.getQuantity());
		existingItem.setMileage(itemDto.getMileage()); 
		existingItem.setShape(itemDto.getShape());  
		existingItem.setModelYear(itemDto.getModelYear()); 
		existingItem.setVehicleHistory(itemDto.getVehicleHistory());
		existingItem.setInteriorColor(itemDto.getInteriorColor());
		existingItem.setExteriorColor(itemDto.getExteriorColor());
		existingItem.setFabric(itemDto.getFabric());
		// Update other fields as necessary

		// Save updated item to DB
		return itemRepo.save(existingItem);
	}
	@Override
	public List<ItemDto> getAllItems(int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		Page<Item> itemPage = itemRepo.findAll(pageable);
		return itemPage.getContent().stream().map(this::convertToDto).collect(Collectors.toList());
	}


	@Override
	public List<ItemDto> getItemsByBrand(String brand) {
		List<Item> items = itemRepo.findByBrand(brand);
		return items.stream().map(this::convertToDto).collect(Collectors.toList());
	}

	@Override
	public List<ItemDto> getSortedItemsByPrice(String order) {
		List<Item> items;
		if ("asc".equalsIgnoreCase(order)) {
			items = itemRepo.findByOrderByPriceAsc();
		} else {
			items = itemRepo.findByOrderByPriceDesc();
		}
		return items.stream().map(this::convertToDto).collect(Collectors.toList());
	}

	@Override
	public List<ItemDto> getSortedItemsByMileage(String order) {
		List<Item> items;
		if ("asc".equalsIgnoreCase(order)) {
			items = itemRepo.findByOrderByMileageAsc();
		} else {
			items = itemRepo.findByOrderByMileageDesc();
		}
		return items.stream().map(this::convertToDto).collect(Collectors.toList());
	}


	@Override
	public ItemDto getItemById(Long id) {
		return itemRepo.findById(id).map(this::convertToDto).orElse(null);
	}

	private ItemDto convertToDto(Item item) {
		return new ItemDto(
				item.getVid(), 
				item.getName(), 
				item.getDescription(), 
				item.getBrand(), 
				item.getModel(), 
				item.getImageUrl(), 
				item.getPrice(), 
				item.getQuantity(), 
				item.getMileage(),
				item.getShape(),   
				item.getModelYear(), 
				item.getVehicleHistory(), 
				item.getInteriorColor(),   
				item.getExteriorColor(),  
				item.getFabric() 
			
				);
	}


	@Override
	public List<ItemDto> getItemsByShape(String shape) {
		List<Item> items = itemRepo.findByShape(shape);
		return items.stream().map(this::convertToDto).collect(Collectors.toList());
	}

	@Override
	public List<ItemDto> getItemsByModelYear(Integer year) {
		List<Item> items = itemRepo.findByModelYear(year);
		return items.stream().map(this::convertToDto).collect(Collectors.toList());
	}




	@Override
	public List<ItemDto> getItemsByVehicleHistoryNoDamage() {
		List<Item> items = itemRepo.findByVehicleHistoryNoDamage();
		return items.stream().map(this::convertToDto).collect(Collectors.toList());
	}

	@Override
	public List<ItemDto> getItemsByVehicleHistoryWithDamage() {
		List<Item> items = itemRepo.findByVehicleHistoryWithDamage();
		return items.stream().map(this::convertToDto).collect(Collectors.toList());
	}




	public List<ItemDto> searchItems(String searchValue) {
		// Implement the search logic, assuming you are searching by name
		List<Item> items = itemRepo.findByNameContainingIgnoreCase(searchValue);

		// Directly map Item to ItemDto
		return items.stream()
				.map(item -> new ItemDto(
						item.getVid(),
						item.getName(),
						item.getDescription(),
						item.getBrand(),
						item.getModel(),
						item.getImageUrl(),
						item.getPrice(),
						item.getQuantity(),
						item.getMileage(),
						item.getShape(),
						item.getModelYear(),
						item.getVehicleHistory(), 
						item.getInteriorColor(),  
						item.getExteriorColor(),  
						item.getFabric() 
						
						))
				.collect(Collectors.toList());
	}





	@Override
	public ItemDto getItemDetails(Long itemId) {
		return itemRepo.findByVid(itemId)
				.map(this::convertToDto)
				.orElseThrow(() -> new RuntimeException("Item not found with ID: " + itemId));
	}



	@Override
	@Transactional
	public void deleteItem(Long itemId) {
	    Item item = itemRepo.findById(itemId)
	            .orElseThrow(() -> new RuntimeException("Item not found"));

	    itemRepo.delete(item);  // Delete the item from the database
	}


	
	@Override
	public List<ItemDto> filterItems(String brand, String shape, Integer modelYear, String vehicleHistory) {
	    List<Item> items = itemRepo.filterItems(
	        brand != null && !brand.isEmpty() ? brand : null,
	        shape != null && !shape.isEmpty() ? shape : null,
	        modelYear, 
	        vehicleHistory != null && !vehicleHistory.isEmpty() ? vehicleHistory : null
	    );

	    return items.stream().map(this::convertToDto).collect(Collectors.toList());
	}


	public List<String> getItemReviews(Long itemId) {
		Item item = itemRepo.findByVid(itemId)
				.orElseThrow(() -> new RuntimeException("Item not found"));
		return item.getReviews();
	}

	public Item addReview(Long itemId, int rating, String comment) {
		Item item = itemRepo.findByVid(itemId)
				.orElseThrow(() -> new RuntimeException("Item not found"));

		String formattedReview = rating + "|" + comment;
		item.getReviews().add(formattedReview);
		return itemRepo.save(item);

	}




}
