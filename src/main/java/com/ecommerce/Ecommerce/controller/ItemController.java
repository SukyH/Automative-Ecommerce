
package com.ecommerce.Ecommerce.controller;

import com.ecommerce.Ecommerce.dto.ItemDto;
import com.ecommerce.Ecommerce.dto.OrderDto;
import com.ecommerce.Ecommerce.entity.Item;
import com.ecommerce.Ecommerce.entity.Review;
import com.ecommerce.Ecommerce.repository.ItemRepo;
import com.ecommerce.Ecommerce.service.interf.ItemService;
import com.ecommerce.Ecommerce.service.AwsS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/catalog")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private AwsS3Service awsS3Service;

    // list vehicles in catalog
    @GetMapping("/items")
    public ResponseEntity<List<ItemDto>> getAllItems(@RequestParam(defaultValue = "0") int page,
                                                      @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(itemService.getAllItems(page, size));
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
                item.getVehicleHistory(), 
                item.getInteriorColor(), 
                item.getExteriorColor(), 
                item.getFabric()     
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
                item.getMileage(),
                item.getShape(),
                item.getModelYear(),
                item.getVehicleHistory(),
                item.getInteriorColor(), 
                item.getExteriorColor(),  
                item.getFabric()       
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
    // Search for items by name or other criteria
   	@GetMapping("/items/search")
   	public List<ItemDto> searchItems(@RequestParam String searchValue) {
       	return itemService.searchItems(searchValue);
   	
   }


    //Upload vehicle image to S3
    @PostMapping("/items/upload")
    public ResponseEntity<String> uploadVehicleImage(@RequestParam("file") MultipartFile file) {
        String imageUrl = awsS3Service.saveImageToS3(file);
        return ResponseEntity.ok(imageUrl);
    }
    @GetMapping("/items/details/{itemId}")
    public ResponseEntity<ItemDto> getItemDetails(@PathVariable Long itemId) {
        return ResponseEntity.ok(itemService.getItemDetails(itemId));
    }

    

    @DeleteMapping("/delete/{itemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long itemId) {
        itemService.deleteItem(itemId);
        return ResponseEntity.noContent().build();  // Returns 204 No Content after deletion
    }


    @GetMapping("/items/filter")
    public ResponseEntity<List<ItemDto>> filterItems(
        @RequestParam(required = false) String brand,
        @RequestParam(required = false) String shape,
        @RequestParam(required = false) Integer modelYear,
        @RequestParam(required = false) String vehicleHistory
    ) {
        return ResponseEntity.ok(itemService.filterItems(brand, shape, modelYear, vehicleHistory));
    }


    @PostMapping("/{itemId}/reviews")
    public ResponseEntity<Review> addReview(
            @PathVariable Long itemId,
            @RequestBody Map<String, Object> payload) {

    	int rating = Integer.parseInt(payload.get("rating").toString());
    	String comment = payload.get("comment").toString();


        if (rating < 1 || rating > 5) {
            return ResponseEntity.badRequest().body(null);
        }

        Review saved = itemService.addReview(itemId, rating, comment);
        return ResponseEntity.ok(saved);
    }


    @GetMapping("/{itemId}/reviews")
    public ResponseEntity<List<Review>> getItemReviews(@PathVariable Long itemId) {
        return ResponseEntity.ok(itemService.getItemReviews(itemId));
    }


}

    


 
    
