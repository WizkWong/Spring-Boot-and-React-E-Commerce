package com.example.SpringBootDemo.product;

import com.example.SpringBootDemo.exception.DuplicateException;
import com.example.SpringBootDemo.exception.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public Product getProductById(long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Product ID:{%d} is not found", id)));
    }

    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    public List<Product> getProductBySearch(String searchTxt) {
        return productRepository.findByNameContainingIgnoreCase(searchTxt);
    }

    public Product createProduct(Product product) {
        if (productRepository.findByName(product.getName()).isPresent()) {
            throw new DuplicateException(String.format("Product Name:{%s} is taken", product.getName()));
        }

        product.setCreated_datetime(LocalDateTime.now());

        return productRepository.save(product);
    }

    public String createMultipleProduct(List<Product> productList) {
        return productList.stream().map((product) -> {

            if (productRepository.findByName(product.getName()).isPresent()) {
                return String.format("Product Name:{%s} is taken", product.getName());
            }
            product.setCreated_datetime(LocalDateTime.now());
            productRepository.save(product);
            return null;

        }).filter(Objects::nonNull).collect(Collectors.joining(", "));
    }

    @Transactional
    public String updateProduct(Product product, Product requestProduct) {
        if (!Objects.equals(product.getName(), requestProduct.getName())) {

            if (productRepository.findByName(requestProduct.getName()).isPresent()) {
                return String.format("Product Name:{%s} is taken", requestProduct.getName());
            }
            product.setName(requestProduct.getName());
        }

        if (!Objects.equals(product.getCategory(), requestProduct.getCategory())) {
            product.setCategory(requestProduct.getCategory());
        }

        if (!Objects.equals(product.getPrice(), requestProduct.getPrice())) {
            product.setPrice(requestProduct.getPrice());
        }
        return null;
    }

    @Transactional
    public void preUpdateProduct(long id, Product requestProduct) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Product ID:{%d} is not found", id)));

        String errorMsg = updateProduct(product, requestProduct);
        if (errorMsg != null) {
            throw new DuplicateException(errorMsg);
        }
    }

    @Transactional
    public void updateMultipleProduct(List<Product> listProduct) {
        String errorMsg = listProduct.stream().map(product -> {
            Product oldProduct = productRepository.findById(product.getId())
                    .orElseThrow(() -> new NotFoundException(String.format("Product ID:{%s} is not found", product.getId())));

            return updateProduct(oldProduct, product);
        }).filter(Objects::nonNull).collect(Collectors.joining(", "));

        if (!errorMsg.isEmpty()) {
            throw new DuplicateException(errorMsg);
        }

    }

    public void deleteProduct(long id) {
        if (!productRepository.existsById(id)) {
            throw new NotFoundException(String.format("Product ID:{%d} is not found", id));
        }
        productRepository.deleteById(id);
    }
}
