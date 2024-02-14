package com.example.SpringBootDemo.customer_order.DTO;

import com.example.SpringBootDemo.customer_order.CustomerOrderItem;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@AllArgsConstructor
public class CustomerOrderItemDTOMapper implements Function<CustomerOrderItem, CustomerOrderItemDTO> {

    @Override
    public CustomerOrderItemDTO apply(CustomerOrderItem customerOrderItem) {
        return CustomerOrderItemDTO.builder()
                .name(customerOrderItem.getProduct().getName())
                .category(customerOrderItem.getProduct().getCategory())
                .price(customerOrderItem.getProduct().getPrice())
                .image(customerOrderItem.getProduct().getImage())
                .quantity(customerOrderItem.getQuantity())
                .build();
    }
}
