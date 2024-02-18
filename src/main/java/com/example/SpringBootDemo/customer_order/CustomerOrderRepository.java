package com.example.SpringBootDemo.customer_order;

import com.example.SpringBootDemo.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long> {

    Optional<CustomerOrder> findByIdAndCustomer(long id, Customer customer);

    List<CustomerOrder> findByCustomerOrderByOrderDateTimeDesc(Customer customer);
}
