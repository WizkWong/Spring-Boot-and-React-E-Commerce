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
    CommandLineRunner commandLineRunner(CustomerService service) {
        return null;
//        return args -> {
//            User user1 = new User(
//                "Home",
//                "nah",
//                "home@gmail.com",
//                "0119382048",
//                false,
//                false
//            );
//        };
    }

    // must to create ModelMapper class in configuration or else will boot up error
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
