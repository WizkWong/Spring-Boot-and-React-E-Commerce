package com.example.SpringBootDemo.product;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @GetMapping(path = "/all")
    public List<Product> getAllProduct() {
        return productService.getAllProduct();
    }

    @GetMapping
    public List<Product> getProductBySearch(@RequestParam("search") String searchTxt) {
        return productService.getProductBySearch(searchTxt);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(product));
    }

    @PostMapping(path = "/create-multiple")
    public ResponseEntity<String> createMultipleProduct(@RequestBody List<Product> productList) {
        String ergMsg = productService.createMultipleProduct(productList);
        return ergMsg.isEmpty() ? ResponseEntity.ok(null) : ResponseEntity.status(HttpStatus.CONFLICT).body(ergMsg);
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
