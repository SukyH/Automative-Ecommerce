package com.ecommerce.Ecommerce.controller;

import com.ecommerce.Ecommerce.dto.ItemDto;
import com.ecommerce.Ecommerce.entity.Item;
import com.ecommerce.Ecommerce.service.interf.ItemService;
import com.ecommerce.Ecommerce.service.AwsS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/catalog")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private AwsS3Service awsS3Service;

    // list vehicles in catalog
    @GetMapping("/items")
    public List<ItemDto> getAllItems() {
        return itemService.getAllItems();
    }
    
    @PostMapping("/items/create")
    public ItemDto createItem(@RequestBody ItemDto itemDto) {
        Item item = itemService.createItem(itemDto); // Create item through service
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
     
    @PutMapping("/items/update")
    public ItemDto updateItem(@RequestBody ItemDto itemDto) {
        // Update item through service
        Item item = itemService.updateItem(itemDto);

     

        return new ItemDto(
                item.getVid(),
                item.getName(),
                item.getDescription(),
                item.getBrand(),
                item.getModel(),
                item.getImageUrl(),
                item.getPrice(),
                item.getQuantity(),
                item.getMileage(),  // ✅ Added missing fields
                item.getShape(),
                item.getModelYear(),
                item.getVehicleHistory()
            );
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

    @GetMapping("/items/history/no-damage")
    public List<ItemDto> getItemsByVehicleHistoryNoDamage() {
        return itemService.getItemsByVehicleHistoryNoDamage();
    }

    @GetMapping("/items/history/with-damage")
    public List<ItemDto> getItemsByVehicleHistoryWithDamage() {
        return itemService.getItemsByVehicleHistoryWithDamage();
    }


    //Upload vehicle image to S3
    @PostMapping("/items/upload")
    public ResponseEntity<String> uploadVehicleImage(@RequestParam("file") MultipartFile file) {
        String imageUrl = awsS3Service.saveImageToS3(file);
        return ResponseEntity.ok(imageUrl);
    }
}

