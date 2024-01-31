package com.example.SpringBootDemo.customer_visit;

import com.example.SpringBootDemo.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerVisitRepository extends JpaRepository<CustomerVisit, Long> {

    Optional<CustomerVisit> findByCustomerAndCategory(Customer customer, String category);

    @Query(value = "SELECT TOP (:limit) category FROM customer_visit WHERE customer_id = :customerId ORDER BY visited_count DESC",
            nativeQuery = true)
    List<String> findTopCategoryVisitByCustomerId(long customerId, int limit);
}
