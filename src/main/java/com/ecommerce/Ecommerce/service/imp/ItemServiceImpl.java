package com.ecommerce.Ecommerce.service.imp;

import com.ecommerce.Ecommerce.dto.ItemDto;
import com.ecommerce.Ecommerce.entity.Item;
import com.ecommerce.Ecommerce.repository.ItemRepo;
import com.ecommerce.Ecommerce.service.interf.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        // Update other fields as necessary

        // Save updated item to DB
        return itemRepo.save(existingItem);
    }
    @Override
    public List<ItemDto> getAllItems() {
        List<Item> items = itemRepo.findAll();
        return items.stream().map(this::convertToDto).collect(Collectors.toList());
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
            item.getVehicleHistory()
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
    
    @Override
    public ItemDto getItemDetails(Long itemId) {
        return itemRepo.findByVid(itemId)
                .map(this::convertToDto)
                .orElseThrow(() -> new RuntimeException("Item not found with ID: " + itemId));
    }
    
 

}
