package com.ecommerce.Ecommerce.service.interf;

import com.ecommerce.Ecommerce.dto.LoginRequest;
import com.ecommerce.Ecommerce.dto.Response;
import com.ecommerce.Ecommerce.dto.AddressDto;
import com.ecommerce.Ecommerce.entity.Address;

public interface AddressService {
    Response saveAndUpdateAddress(AddressDto addressDto);
}