package com.ecommerce.Ecommerce.service.interf;


import com.ecommerce.Ecommerce.dto.LoginRequest;
import com.ecommerce.Ecommerce.dto.Response;
import com.ecommerce.Ecommerce.dto.UserDto;
import com.ecommerce.Ecommerce.entity.User;

public interface UserService {
    Response registerUser(UserDto registrationRequest);
    Response loginUser(LoginRequest loginRequest);
    Response getAllUsers();
    User getLoginUser();
   
	Response getUserInfoAndOrderHistory(Long userId);
}