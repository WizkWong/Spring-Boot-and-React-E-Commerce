package com.example.SpringBootDemo.customer_visit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerVisitRepository extends JpaRepository<CustomerVisit, Long> {
}
