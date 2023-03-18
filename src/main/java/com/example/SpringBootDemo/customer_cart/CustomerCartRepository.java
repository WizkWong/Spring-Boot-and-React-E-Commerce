package com.example.SpringBootDemo.customer_cart;

import com.example.SpringBootDemo.customer.Customer;
import com.example.SpringBootDemo.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerCartRepository extends JpaRepository<CustomerCart, Long> {
    List<CustomerCart> findByCustomer(Customer customer);

    Optional<CustomerCart> findByCustomerAndProduct(Customer customer, Product product);
}
