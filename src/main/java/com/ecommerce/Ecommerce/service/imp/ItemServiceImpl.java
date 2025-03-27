package com.ecommerce.Ecommerce.service.imp;

import com.ecommerce.Ecommerce.dto.ItemDto;
import com.ecommerce.Ecommerce.entity.Item;
import com.ecommerce.Ecommerce.entity.Review;
import com.ecommerce.Ecommerce.repository.ItemRepo;
import com.ecommerce.Ecommerce.repository.ReviewRepository;
import com.ecommerce.Ecommerce.service.AwsS3Service;
import com.ecommerce.Ecommerce.service.interf.ItemService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService {


	    private final ItemRepo itemRepo;
	    private final ReviewRepository reviewRepo;
	    private final AwsS3Service awsS3Service;

	    @Autowired
	    public ItemServiceImpl(ItemRepo itemRepo, ReviewRepository reviewRepo, AwsS3Service awsS3Service) {
	        this.itemRepo = itemRepo;
	        this.reviewRepo = reviewRepo;
	        this.awsS3Service = awsS3Service;
	    }

	    @Override
	    public Item createItem(ItemDto itemDto, MultipartFile imageFile) {
	        String imageUrl = null;

	        try {
	            // Upload image to S3 if present
	            if (imageFile != null && !imageFile.isEmpty()) {
	                imageUrl = awsS3Service.saveImageToS3(imageFile);
	            }
	        } catch (Exception e) {
	            throw new RuntimeException("Failed to upload image to S3", e);
	        }

	        // Create item
	        Item item = new Item();
	        item.setName(itemDto.getName());
	        item.setDescription(itemDto.getDescription());
	        item.setBrand(itemDto.getBrand());
	        item.setModel(itemDto.getModel());
	        item.setPrice(itemDto.getPrice());
	        item.setQuantity(itemDto.getQuantity());
	        item.setMileage(itemDto.getMileage());
	        item.setShape(itemDto.getShape());
	        item.setModelYear(itemDto.getModelYear());
	        item.setVehicleHistory(itemDto.getVehicleHistory());
	        item.setInteriorColor(itemDto.getInteriorColor());
	        item.setExteriorColor(itemDto.getExteriorColor());
	        item.setFabric(itemDto.getFabric());

	        if (imageUrl != null) {
	            item.setImageUrl(imageUrl);
	        }

	        // Save to DB
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
	
	
	@Override
	public Review addReview(Long itemId, int rating, String comment) {
	    Item item = itemRepo.findByVid(itemId)
	            .orElseThrow(() -> new RuntimeException("Item not found"));

	    Review review = new Review();
	    review.setRating(rating);
	    review.setComment(comment);
	    review.setItem(item);

	    return reviewRepo.save(review);
	}



	@Override
	public List<Review> getItemReviews(Long itemId) {
	    return reviewRepo.findByItemVid(itemId);
	}







}
