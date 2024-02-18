package com.example.SpringBootDemo.customer_order.DTO;

import com.example.SpringBootDemo.customer_order.CustomerOrderItem;
import com.example.SpringBootDemo.product.ProductDTOMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@AllArgsConstructor
public class CustomerOrderItemDTOMapper implements Function<CustomerOrderItem, CustomerOrderItemDTO> {

    private ProductDTOMapper productDTOMapper;

    @Override
    public CustomerOrderItemDTO apply(CustomerOrderItem customerOrderItem) {
        return CustomerOrderItemDTO.builder()
                .productDTO(productDTOMapper.apply(customerOrderItem.getProduct()))
                .quantity(customerOrderItem.getQuantity())
                .build();
    }
}
