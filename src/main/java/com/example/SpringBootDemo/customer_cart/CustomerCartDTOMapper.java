package com.example.SpringBootDemo.customer_cart;

import com.example.SpringBootDemo.product.ProductDTOMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@AllArgsConstructor
public class CustomerCartDTOMapper implements Function<CustomerCart, CustomerCartDTO> {

    private final ProductDTOMapper productDTOMapper;

    @Override
    public CustomerCartDTO apply(CustomerCart customerCart) {
        return CustomerCartDTO.builder()
                .productDTO(productDTOMapper.apply(customerCart.getProduct()))
                .quantity(customerCart.getQuantity())
                .build();
    }
}
