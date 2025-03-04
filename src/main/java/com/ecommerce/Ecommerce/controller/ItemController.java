package com.ecommerce.Ecommerce.controller;

import com.ecommerce.Ecommerce.dto.ItemDto;
import com.ecommerce.Ecommerce.service.interf.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/catalog")
public class ItemController {

    @Autowired
    private ItemService itemService;

    //list vehicles in catalog
    @GetMapping("/items")
    public List<ItemDto> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/items/{id}")
    public ItemDto getItemById(@PathVariable Long id) {
        return itemService.getItemById(id);
    }

    @GetMapping("/items/brand/{brand}")
    public List<ItemDto> getItemsByBrand(@PathVariable String brand) {
        return itemService.getItemsByBrand(brand);
    }

    @GetMapping("/items/sort")
    public List<ItemDto> getSortedItemsByPrice(@RequestParam String order) {
        return itemService.getSortedItemsByPrice(order);
    }
    
 // Sort by Mileage
    @GetMapping("/items/sort/mileage")
    public List<ItemDto> getSortedItemsByMileage(@RequestParam String order) {
        return itemService.getSortedItemsByMileage(order);
    }

    // Filter by Shape
    @GetMapping("/items/shape/{shape}")
    public List<ItemDto> getItemsByShape(@PathVariable String shape) {
        return itemService.getItemsByShape(shape);
    }

    // Filter by Model Year
    @GetMapping("/items/year/{year}")
    public List<ItemDto> getItemsByModelYear(@PathVariable Integer year) {
        return itemService.getItemsByModelYear(year);
    }

    // Filter by Vehicle History
    @GetMapping("/items/history/{history}")
    public List<ItemDto> getItemsByVehicleHistory(@PathVariable String history) {
        return itemService.getItemsByVehicleHistory(history);
    }

}
