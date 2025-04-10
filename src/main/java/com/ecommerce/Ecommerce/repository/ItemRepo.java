package com.ecommerce.Ecommerce.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.ecommerce.Ecommerce.entity.Item;
import java.util.Optional;

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

    
    @Query("SELECT i FROM Item i WHERE i.vehicleHistory IS NULL OR i.vehicleHistory = ''")
    List<Item> findByVehicleHistoryNoDamage();

    @Query("SELECT i FROM Item i WHERE i.vehicleHistory IS NOT NULL AND i.vehicleHistory != ''")
    List<Item> findByVehicleHistoryWithDamage();


    Optional<Item> findByVid(Long vid);
    List<Item> findByNameContainingIgnoreCase(String searchValue);

	List<Item> findByBrandContainingAndShapeContainingAndModelYearAndVehicleHistoryContaining(String brand,
			String shape, Integer modelYear, String vehicleHistory);

	
	void deleteById(Long itemId);
	
	@Query("SELECT i FROM Item i WHERE "
		     + "(:brand IS NULL OR i.brand LIKE %:brand%) AND "
		     + "(:shape IS NULL OR i.shape LIKE %:shape%) AND "
		     + "(:modelYear IS NULL OR i.modelYear = :modelYear) AND "
		     + "(:vehicleHistory IS NULL OR i.vehicleHistory LIKE %:vehicleHistory%)")
		List<Item> filterItems(@Param("brand") String brand,
		                       @Param("shape") String shape,
		                       @Param("modelYear") Integer modelYear,
		                       @Param("vehicleHistory") String vehicleHistory);


}
