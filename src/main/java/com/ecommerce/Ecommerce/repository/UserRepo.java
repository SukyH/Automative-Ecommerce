package com.ecommerce.Ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ecommerce.Ecommerce.entity.User;
import com.ecommerce.Ecommerce.enums.UserRole;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    // Check if a user with the given role exists (e.g., check for an admin)
    List<User> findByRole(UserRole role);

    // Find a user by email and role (e.g., ensure only admins can log in to the admin panel)
    Optional<User> findByEmailAndRole(String email, UserRole role);

    // Check if an email is already taken
    boolean existsByEmail(String email);
}


