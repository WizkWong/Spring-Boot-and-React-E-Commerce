package com.example.SpringBootDemo;

import com.example.SpringBootDemo.product.Product;
import com.example.SpringBootDemo.product.ProductRepository;
import com.example.SpringBootDemo.user.User;
import com.example.SpringBootDemo.user.UserRepository;
import com.example.SpringBootDemo.user.UserRole;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.LocalDateTime;

@Configuration
public class configuration {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:3000");
            }
        };
    }

    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByRole(UserRole.ADMIN).isEmpty()) {
                User user = new User();
                user.setUsername("admin");
                user.setPassword(passwordEncoder.encode("admin123"));
                user.setRole(UserRole.ADMIN);
                user.setCreated_datetime(LocalDateTime.now());
                userRepository.save(user);
            }

//            Product product = new Product();
//            product.setName("fries");
//            product.setPrice(3.0);
//            product.setCreated_datetime(LocalDateTime.now());
//            productRepository.save(product);
        };
    }

    // must create ModelMapper class in configuration or else will boot up error
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
