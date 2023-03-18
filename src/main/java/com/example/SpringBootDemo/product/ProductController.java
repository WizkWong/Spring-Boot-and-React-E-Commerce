package com.example.SpringBootDemo.product;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/product")
public class ProductController {

    private final ProductService productService;

    @GetMapping(path = "/get/id/{id}")
    public Product getProductById(@PathVariable("id") long id) {
        return productService.getProductById(id);
    }

    @GetMapping(path = "/getall")
    public List<Product> getAllProduct() {
        return productService.getAllProduct();
    }

    @PostMapping(path = "/create")
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    @PutMapping(path = "/update/id/{id}")
    public void updateProduct(@PathVariable("id") long id, @RequestBody Product product) {
        productService.preUpdateProduct(id, product);
    }

    @PutMapping(path = "/update/name/multiple")
    public void updateMultipleProduct(@RequestBody List<ProductDTO> listProduct) {
        productService.updateMultipleProduct(listProduct);
    }

    @DeleteMapping(path = "/delete/id/{id}")
    public void deleteProduct(@PathVariable("id") long id) {
        productService.deleteProduct(id);
    }
}
