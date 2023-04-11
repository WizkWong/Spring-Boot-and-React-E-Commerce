package com.example.SpringBootDemo.product;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/product")
public class ProductController {

    private final ProductService productService;

    @GetMapping(path = "/{id}")
    public Product getProductById(@PathVariable("id") long id) {
        return productService.getProductById(id);
    }

    @GetMapping
    public List<Product> getAllProduct() {
        return productService.getAllProduct();
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    @PutMapping(path = "/{id}")
    public void updateProduct(@PathVariable("id") long id, @RequestBody Product product) {
        productService.preUpdateProduct(id, product);
    }

    @PutMapping
    public void updateMultipleProduct(@RequestBody List<Product> listProduct) {
        productService.updateMultipleProduct(listProduct);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteProduct(@PathVariable("id") long id) {
        productService.deleteProduct(id);
    }
}
