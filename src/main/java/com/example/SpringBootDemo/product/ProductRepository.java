package com.example.SpringBootDemo.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Long> {

//    @Query("FROM ProductEntity WHERE name = ?1")
    Optional<ProductEntity> findByName(String name);

}
