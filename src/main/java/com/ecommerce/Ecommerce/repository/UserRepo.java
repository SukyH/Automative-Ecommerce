package com.ecommerce.Ecommerce.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecommerce.Ecommerce.entity.Item;
import com.ecommerce.Ecommerce.entity.User;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
Optional<User> findbyEmail(String email);
	
}


