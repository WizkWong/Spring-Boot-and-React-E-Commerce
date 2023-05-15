package com.example.SpringBootDemo.product;

import com.example.SpringBootDemo.exception.DuplicateException;
import com.example.SpringBootDemo.exception.NotFoundException;
import com.example.SpringBootDemo.exception.NotValidException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

    public ProductSearchResult getAllProduct(int page) {
        Page<Product> productPage = productRepository.findAll(PageRequest.of(page, 30));

        return new ProductSearchResult(
                productPage.getContent(),
                productPage.getTotalPages()
        );
    }

    public ProductSearchResult getProductBySearch(int page, String searchTxt) {
        // clear extra spaces of searchTxt
        searchTxt = searchTxt.trim();

        // check searchTxt is existed or not
        if (searchTxt.isEmpty()) {
            throw new NotValidException("Search parameter cannot be empty!");
        }

        // split the searchTxt then join with "%" for query purpose
        searchTxt = String.join("%", searchTxt.split(" "));

        Page<Product> productPage = productRepository.findByNameContainingIgnoreCase(searchTxt, PageRequest.of(page, 30));

        return new ProductSearchResult(
                productPage.getContent(),
                productPage.getTotalPages()
        );
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
            // check product name has taken or not
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

            // check product name has taken or not
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

        if (requestProduct.getImage() != null && !Objects.equals(product.getImage(), requestProduct.getImage())) {
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

        }).filter(Objects::nonNull).collect(Collectors.joining(", ")); // filter nonNUll and join string ","

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
