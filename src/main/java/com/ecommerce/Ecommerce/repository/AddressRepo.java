package com.ecommerce.Ecommerce.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.Ecommerce.entity.Address;

public interface AddressRepo extends JpaRepository<Address, Long> {

}
