package com.ecommerce.Ecommerce.service.imp;

import com.ecommerce.Ecommerce.dto.LoginRequest;
import com.ecommerce.Ecommerce.dto.Response;
import com.ecommerce.Ecommerce.dto.UserDto;
import com.ecommerce.Ecommerce.entity.Address;
import com.ecommerce.Ecommerce.entity.User;
import com.ecommerce.Ecommerce.enums.UserRole;
import com.ecommerce.Ecommerce.mapper.EntityMapper;

import com.ecommerce.Ecommerce.repository.UserRepo;
import com.ecommerce.Ecommerce.security.JwtUtils;
import com.ecommerce.Ecommerce.service.interf.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;




@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImp implements UserService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final EntityMapper entityMapper;

    @Override
    public Response registerUser(UserDto registrationRequest) {
        UserRole role = UserRole.USER;

        if (registrationRequest.getRole() != null && registrationRequest.getRole().equalsIgnoreCase("admin")) {
            role = UserRole.ADMIN;
        }

     

        // Create User entity
        User user = new User();
        user.setName(registrationRequest.getName());
        user.setEmail(registrationRequest.getEmail());
        user.setPhoneNumber(registrationRequest.getPhoneNumber());
        user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
        user.setRole(role);

        // Create Address entity and link it to user
        if (registrationRequest.getAddress() != null) {
            Address address = new Address();
            address.setStreet(registrationRequest.getAddress().getStreet());
            address.setCity(registrationRequest.getAddress().getCity());
            address.setProvince(registrationRequest.getAddress().getProvince());
            address.setCountry(registrationRequest.getAddress().getCountry());
            address.setZipCode(registrationRequest.getAddress().getZipCode());
            address.setUser(user);
                
            user.setAddress(address);
        }


        User savedUser = userRepo.save(user);
        log.info("User successfully registered with email: {}", registrationRequest.getEmail());

        UserDto userDto = entityMapper.userToUserDto(savedUser);
        return Response.builder()
                .status(200)
                .message("User Successfully Added")
                .user(userDto)
                .build();
    }

    public Response loginUser(LoginRequest loginRequest) {

        // Fetch user by email or throw a default exception if not found
        User user = userRepo.findByEmail(loginRequest.getEmail())
                            .orElseThrow(() -> new UsernameNotFoundException("User not found with the provided email"));

        // Check if password matches or throw a default exception for invalid credentials
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtils.generateToken(user);

        // Expiration time in hours (6 hours)
        String expirationTime = "6 hours";

        log.info("User successfully logged in with email: {}", loginRequest.getEmail());

        return Response.builder()
                .status(200)
                .message("User Successfully Logged In")
                .token(token)
                .expirationTime(expirationTime) // Return expiration time dynamically
                .role(user.getRole().name())
                .id(user.getId())
                .build();
    }

    @Override
    public Response getAllUsers() {
        List<User> users = userRepo.findAll();
        List<UserDto> userDtos = users.stream()
                .map(entityMapper::userToUserDto)
                .toList();


        return Response.builder()
                .status(200)
                .userList(userDtos)
                .build();
    }

    @Override
    public User getLoginUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        log.info("User Email is: {}", email);
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not found"));
    }

    @Override
    public Response getUserInfoAndOrderHistory() {
        User user = getLoginUser(); 
        if (user == null) {
            throw new RuntimeException("User not found or unauthorized");
        }

        UserDto userDto = entityMapper.mapUserToDtoPlusAddressAndOrderHistory(user);
        return Response.builder()
                .status(200)
                .user(userDto)
                .build();
    }

}
