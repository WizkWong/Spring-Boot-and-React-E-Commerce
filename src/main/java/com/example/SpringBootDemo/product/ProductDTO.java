package com.example.SpringBootDemo.product;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProductDTO {
    private Long id;
    private String name;
    private String category;
    private Double price;
    private String image;
}
