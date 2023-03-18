package com.example.SpringBootDemo;

import com.example.SpringBootDemo.product.Product;
import com.example.SpringBootDemo.product.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class configuration {

    @Bean
    CommandLineRunner commandLineRunner(ProductRepository productRepository) {
        return args -> {
            Product product = new Product();
            product.setName("fries");
            product.setPrice(3.0);
            product.setCreated_datetime(LocalDateTime.now());
            productRepository.save(product);

        };
    }

    // must create ModelMapper class in configuration or else will boot up error
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
