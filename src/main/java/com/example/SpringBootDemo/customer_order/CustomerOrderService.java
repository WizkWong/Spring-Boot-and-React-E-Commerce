package com.example.SpringBootDemo.customer_order;

import com.example.SpringBootDemo.customer.Customer;
import com.example.SpringBootDemo.customer.CustomerRepository;
import com.example.SpringBootDemo.customer_cart.CustomerCartRepository;
import com.example.SpringBootDemo.exception.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CustomerOrderService {

    CustomerOrderRepository customerOrderRepository;
    CustomerRepository customerRepository;
    CustomerCartRepository customerCartRepository;

    public CustomerOrder getCustomerOrderById(long customerId, long orderId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", customerId)));

        return customerOrderRepository.findByIdAndCustomer(orderId, customer)
                .orElseThrow(() -> new NotFoundException(String.format("Customer Order:{%d} is not found", orderId)));
    }

}
