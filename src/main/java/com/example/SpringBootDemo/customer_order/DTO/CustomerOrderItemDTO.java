package com.example.SpringBootDemo.customer_order.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CustomerOrderItemDTO {

    private String name;
    private String category;
    private Double price;
    private String image;
    private Integer quantity;
}
