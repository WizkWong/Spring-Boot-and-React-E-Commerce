package com.example.SpringBootDemo.product;

import java.util.List;

public record ProductSearchResult(
        List<Product> productList,
        int totalPages
) {
}
