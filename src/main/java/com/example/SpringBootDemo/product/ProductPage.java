package com.example.SpringBootDemo.product;

import java.util.List;

public record ProductPage(
        List<ProductDTO> productList,
        int totalPages
) {
}
