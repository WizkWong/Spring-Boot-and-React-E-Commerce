package com.example.SpringBootDemo.customer_order.DTO;

import com.example.SpringBootDemo.product.ProductDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@JsonPropertyOrder({ "product", "quantity" })
public class CustomerOrderItemDTO {
    @JsonProperty("product")
    private ProductDTO productDTO;
    private Integer quantity;
}
