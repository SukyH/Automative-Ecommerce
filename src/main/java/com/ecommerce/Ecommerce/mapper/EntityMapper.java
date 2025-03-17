package com.ecommerce.Ecommerce.mapper;

import com.ecommerce.Ecommerce.dto.*;
import com.ecommerce.Ecommerce.entity.*;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EntityMapper {


	@Named("BasicUserToUserDto")
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
    OrderItemDTO orderItemToOrderItemDto(OrderItem orderItem);
    OrderItem orderItemDtoToOrderItem(OrderItemDTO orderItemDto);

    // Order Mappings
    OrderDto orderToOrderDto(Order order);
    Order orderDtoToOrder(OrderDto orderDto);

    
    // Mapping User with Address and Order History
    @Named("UserToUserDtoWithDetails")

    @Mapping(target = "orderItemList", source = "orders")
    @Mapping(target = "address", source = "user.address")

    UserDto mapUserToDtoPlusAddressAndOrderHistory(User user);


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

    List<OrderItemDTO> orderItemsToOrderItemDtos(List<OrderItem> orderItems);
    List<OrderItem> orderItemDtosToOrderItems(List<OrderItemDTO> orderItemDtos);

    // List of Users Mapping (if needed)
    List<UserDto> usersToUserDtos(List<User> users);
    List<User> userDtosToUsers(List<UserDto> userDtos);

    // Additional mapping for collections (if necessary)
    List<OrderDto> ordersToOrderDtos(List<Order> orders);
    List<Order> orderDtosToOrders(List<OrderDto> orderDtos);
}
