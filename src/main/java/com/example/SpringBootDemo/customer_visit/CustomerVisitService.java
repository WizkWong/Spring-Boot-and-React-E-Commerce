package com.example.SpringBootDemo.customer_visit;

import com.example.SpringBootDemo.customer.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class CustomerVisitService {

    private final CustomerRepository customerRepository;
    private final CustomerVisitRepository customerVisitRepository;

    @Transactional
    public void createCustomerVisit(long id, String category) {
        customerRepository.findById(id).ifPresent(customer ->
            customerVisitRepository.save(
                    CustomerVisit.builder()
                            .customer(customer)
                            .category(category)
                            .orderDateTime(LocalDateTime.now())
                            .build()
            )
        );
    }
}
