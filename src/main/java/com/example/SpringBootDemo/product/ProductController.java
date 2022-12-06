package com.example.SpringBootDemo.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/product")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping(path = "/get/id/{id}")
    public ProductEntity getProductById(@PathVariable("id") long id) {
        return productService.getProductById(id);
    }

    @GetMapping(path = "/getall")
    public List<ProductEntity> getAllProduct() {
        return productService.getAllProduct();
    }

    @PostMapping(path = "/create")
    public ResponseEntity<ProductEntity> createProduct(@RequestBody ProductEntity productEntity) {
        return productService.createProduct(productEntity);
    }

    @PutMapping(path = "/update/id/{id}")
    public void updateProduct(@PathVariable("id") long id, @RequestBody ProductEntity productEntity) {
        productService.preUpdateProduct(id, productEntity);
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
