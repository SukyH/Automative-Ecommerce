package com.ecommerce.Ecommerce.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.Ecommerce.entity.Payment;


public interface PaymentRepo extends JpaRepository<Payment, Long> {

}
