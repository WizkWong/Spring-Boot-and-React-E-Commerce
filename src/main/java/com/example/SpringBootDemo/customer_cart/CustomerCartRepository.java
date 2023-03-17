package com.example.SpringBootDemo.customer_cart;

import com.example.SpringBootDemo.customer.CustomerEntity;
import com.example.SpringBootDemo.product.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerCartRepository extends JpaRepository<CustomerCartEntity, Long> {
    List<CustomerCartEntity> findByCustomer(CustomerEntity customer);

    Optional<CustomerCartEntity> findByCustomerAndProduct(CustomerEntity customer, ProductEntity product);
}
