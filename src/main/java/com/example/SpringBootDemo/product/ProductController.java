package com.example.SpringBootDemo.product;

import com.example.SpringBootDemo.customer_visit.CustomerVisitService;
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
    private final CustomerVisitService customerVisitService;

    @GetMapping(path = "/{id}")
    public Product getProductById(@PathVariable("id") long id, @RequestParam(value = "customer-id", required = false) Long customerId) {
        Product product = productService.getProductById(id);

        if (customerId != null) {
            customerVisitService.createCustomerVisit(customerId, product.getCategory());
        }
        return product;
    }

    @GetMapping(path = "/all")
    public ProductPage getAllProduct(@RequestParam("page") int page) {
        return productService.getAllProduct(page);
    }

    @GetMapping
    public ProductPage getProductBySearch(@RequestParam("page") int page, @RequestParam("search") String searchTxt) {
        return productService.getProductBySearch(page, searchTxt);
    }

    @GetMapping(path = "/recommended")
    public ProductPage getRecommendedProduct(@RequestParam("page") int page, @RequestParam("customer-id") long customerId) {
        return productService.getRecommendedProduct(page, customerId);
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
