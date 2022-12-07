package com.example.SpringBootDemo.customer_cart;

import com.example.SpringBootDemo.customer.CustomerEntity;
import com.example.SpringBootDemo.customer.CustomerRepository;
import com.example.SpringBootDemo.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class CustomerCartService {

    public final CustomerRepository customerRepository;
    public final CustomerCartRepository customerCartRepository;

    @Autowired
    public CustomerCartService(CustomerRepository customerRepository, CustomerCartRepository customerCartRepository) {
        this.customerRepository = customerRepository;
        this.customerCartRepository = customerCartRepository;
    }

    public Set<CustomerCartEntity> getCustomerCartById(long id) {
        CustomerEntity customerEntity = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", id)));

        return customerEntity.getCart();
    }
}
