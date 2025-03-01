package com.ecommerce.Ecommerce.mapper;

import com.ecommerce.Ecommerce.dto.*;
import com.ecommerce.Ecommerce.entity.*;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EntityMapper {

    // User Mappings
    UserDto userToUserDto(User user);
    User userDtoToUser(UserDto userDto);

    // Address Mappings
    AddressDto addressToAddressDto(Address address);
    Address addressDtoToAddress(AddressDto addressDto);

    // Category Mappings
    CategoryDto categoryToCategoryDto(Category category);
    Category categoryDtoToCategory(CategoryDto categoryDto);

    // Item Mappings
    ItemDto itemToItemDto(Item item);
    Item itemDtoToItem(ItemDto itemDto);

    // OrderItem Mappings
    OrderItemDto orderItemToOrderItemDto(OrderItem orderItem);
    OrderItem orderItemDtoToOrderItem(OrderItemDto orderItemDto);

    // Order Mappings
    OrderDto orderToOrderDto(Order order);
    Order orderDtoToOrder(OrderDto orderDto);

   


    // Request Mappings (Request-to-DTO mappings)
    LoginRequest loginRequestToLoginRequestDto(LoginRequest loginRequest);
    OrderRequest orderRequestToOrderRequestDto(OrderRequest orderRequest);
    OrderItemRequest orderItemRequestToOrderItemRequestDto(OrderItemRequest orderItemRequest);

    // Response Mappings (Response DTO to Entity mappings)
    Response userToResponse(User user);
    Response categoryToResponse(Category category);
    Response itemToResponse(Item item);
    Response orderItemToResponse(OrderItem orderItem);
    Response orderToResponse(Order order);
    Response paymentToResponse(Payment payment);
    Response reviewToResponse(Review review);
    
    // List Mappings (If you need lists of items and order items)
    List<ItemDto> itemsToItemDtos(List<Item> items);
    List<Item> itemDtosToItems(List<ItemDto> itemDtos);

    List<OrderItemDto> orderItemsToOrderItemDtos(List<OrderItem> orderItems);
    List<OrderItem> orderItemDtosToOrderItems(List<OrderItemDto> orderItemDtos);

    // List of Users Mapping (if needed)
    List<UserDto> usersToUserDtos(List<User> users);
    List<User> userDtosToUsers(List<UserDto> userDtos);

    // Additional mapping for collections (if necessary)
    List<OrderDto> ordersToOrderDtos(List<Order> orders);
    List<Order> orderDtosToOrders(List<OrderDto> orderDtos);
}
