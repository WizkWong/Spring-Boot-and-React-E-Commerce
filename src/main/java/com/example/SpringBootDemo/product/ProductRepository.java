package com.example.SpringBootDemo.product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByName(String name);

    Page<Product> findByOrderByCreatedDatetimeDesc(Pageable pageable);

    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :searchText, '%'))")
    Page<Product> findByNameContainingIgnoreCase(String searchText, Pageable pageable);

    List<Product> findByCategory(String category);

    Page<Product> findByCategoryIn(List<String> category, Pageable pageable);

}
