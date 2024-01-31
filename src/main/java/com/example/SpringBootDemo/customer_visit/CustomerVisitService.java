package com.example.SpringBootDemo.customer_visit;

import com.example.SpringBootDemo.customer.Customer;
import com.example.SpringBootDemo.customer.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CustomerVisitService {

    private final CustomerRepository customerRepository;
    private final CustomerVisitRepository customerVisitRepository;

    @Transactional
    public void createCustomerVisit(long id, String category) {
        Optional<Customer> customer = customerRepository.findById(id);

        if (customer.isEmpty()) {
            return;
        }

        customerVisitRepository.findByCustomerAndCategory(customer.get(), category)
                .ifPresentOrElse(customerVisit -> {
                        customerVisit.incrementVisitedCount();
                        customerVisit.setVisitedDateTime(LocalDateTime.now());
                    },
                    () -> customerVisitRepository.save(
                            CustomerVisit.builder()
                                    .customer(customer.get())
                                    .visitedCount(1)
                                    .category(category)
                                    .visitedDateTime(LocalDateTime.now())
                                    .build()
                    )
                );

    }
}
