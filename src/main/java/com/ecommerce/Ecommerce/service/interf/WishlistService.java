package com.ecommerce.Ecommerce.service.interf;

import com.ecommerce.Ecommerce.entity.Wishlist;
import com.ecommerce.Ecommerce.enums.OrderStatus;
import com.ecommerce.Ecommerce.entity.Item;
import com.ecommerce.Ecommerce.mapper.EntityMapper;
import com.ecommerce.Ecommerce.repository.OrderRepo;
import com.ecommerce.Ecommerce.repository.SalesRepo;
import com.ecommerce.Ecommerce.repository.WishlistRepo;
import com.ecommerce.Ecommerce.repository.OrderItemRepo;
import com.ecommerce.Ecommerce.repository.ItemRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;





public interface WishlistService {
    void addToWishlist(Long userId, Long productId);
    List<Wishlist> getWishlist(Long userId);
    public void removeFromWishlist(Long wishlistId);
}
