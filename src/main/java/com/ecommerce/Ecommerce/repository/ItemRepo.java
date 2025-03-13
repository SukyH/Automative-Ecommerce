package com.ecommerce.Ecommerce.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.ecommerce.Ecommerce.entity.Item;

public interface ItemRepo extends JpaRepository<Item, Long> {

    List<Item> findByCategoryId(Long categoryId);

    List<Item> findByNameContainingOrDescriptionContaining(String name, String description);

    // Filtering by brand
    List<Item> findByBrand(String brand);
 // Filtering by Shape
    List<Item> findByShape(String shape);

    // Filtering by Model Year
    List<Item> findByModelYear(Integer modelYear);

    // Filtering by Vehicle History (Accidents/Damages)
    List<Item> findByVehicleHistory(String vehicleHistory);


    // Sorting by price (ascending/descending)
    List<Item> findByOrderByPriceAsc();
    List<Item> findByOrderByPriceDesc();
    


    @Query("SELECT i FROM Item i ORDER BY i.price ASC")
    List<Item> sortByPrice(@Param("order") String order);
    
    
 // Sorting by Mileage (ascending and descending)
    List<Item> findByOrderByMileageAsc();
    List<Item> findByOrderByMileageDesc();

}
