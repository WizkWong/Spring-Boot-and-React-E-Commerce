package com.example.SpringBootDemo.product;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProductDTO {
    @JsonProperty("product_id")
    private Long id;
    private String name;
    private String category;
    private Double price;
    private String image;
}
