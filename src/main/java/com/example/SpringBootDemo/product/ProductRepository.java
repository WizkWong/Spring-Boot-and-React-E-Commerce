package com.example.SpringBootDemo.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

//    @Query("FROM ProductEntity WHERE name = ?1")
    Optional<Product> findByName(String name);

    List<Product> findByCategory(String category);

}
