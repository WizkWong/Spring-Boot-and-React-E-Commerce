package com.example.SpringBootDemo.customer_visit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerVisitRepository extends JpaRepository<CustomerVisit, Long> {

    @Query(value = "SELECT TOP (:limit) category FROM customer_visit WHERE customer_id = :customerId GROUP BY category, customer_id",
            nativeQuery = true)
    List<String> findTopCategoryVisitByCustomerId(long customerId, int limit);
}
