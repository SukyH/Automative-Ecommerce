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
        return new ItemDto(item.getVid(), item.getName(), item.getDescription(), 
                           item.getBrand(), item.getModel(), item.getImageUrl(), 
                           item.getPrice(), item.getQuantity(), null);
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
    public List<ItemDto> getItemsByVehicleHistory(String history) {
        List<Item> items = itemRepo.findByVehicleHistory(history);
        return items.stream().map(this::convertToDto).collect(Collectors.toList());
    }

}
