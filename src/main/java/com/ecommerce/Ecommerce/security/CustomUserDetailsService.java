package com.ecommerce.Ecommerce.security;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.ecommerce.Ecommerce.repository.UserRepo;
import com.ecommerce.Ecommerce.entity.User;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService{
private final UserRepo userRepo;

@Override
public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    // Fetch the user from the repository using the email (username)
    User user = userRepo.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

    // Return an AuthUser with the fetched user
    return AuthUser.builder()
            .user(user)
            .build();
}


}
