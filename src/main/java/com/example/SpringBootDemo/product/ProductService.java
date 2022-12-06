package com.example.SpringBootDemo.product;

import com.example.SpringBootDemo.exception.DuplicateException;
import com.example.SpringBootDemo.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public ProductEntity getProductById(long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Product ID:{%d} is not found", id)));
    }

    public List<ProductEntity> getAllProduct() {
        return productRepository.findAll();
    }

    public ResponseEntity<ProductEntity> createProduct(ProductEntity productEntity) {
        if (productRepository.findByName(productEntity.getName()).isPresent()) {
            throw new DuplicateException(String.format("Product Name:{%s} is taken", productEntity.getName()));
        }

        productEntity.setCreated_datetime(LocalDateTime.now());

        productEntity = productRepository.save(productEntity);
        return ResponseEntity.status(HttpStatus.CREATED).body(productEntity);
    }

    @Transactional
    public String updateProduct(ProductEntity productEntity, ProductEntity requestProduct) {
        if (!Objects.equals(productEntity.getName(), requestProduct.getName())) {

            if (productRepository.findByName(requestProduct.getName()).isPresent()) {
                return String.format("Product Name:{%s} is taken", requestProduct.getName());
            }
            productEntity.setName(requestProduct.getName());
        }

        if (!Objects.equals(productEntity.getPrice(), requestProduct.getPrice())) {
            productEntity.setPrice(requestProduct.getPrice());
        }
        return null;
    }

    @Transactional
    public void preUpdateProduct(long id, ProductEntity requestProduct) {
        ProductEntity productEntity = productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Product ID:{%d} is not found", id)));

        String errorMsg = updateProduct(productEntity, requestProduct);
        if (errorMsg != null) {
            throw new DuplicateException(errorMsg);
        }
    }

    @Transactional
    public void updateMultipleProduct(List<ProductDTO> listProduct) {
        String errorMsg = listProduct.stream().map(productEntity -> {
            ProductEntity oldProduct = productRepository.findByName(productEntity.getOldProductName())
                    .orElseThrow(() -> new NotFoundException(String.format("Product Name:{%s} is not found", productEntity.getOldProductName())));
            return updateProduct(oldProduct, productEntity.getNewProduct());
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
