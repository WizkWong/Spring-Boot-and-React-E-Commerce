package com.example.SpringBootDemo.customer_order;

import com.example.SpringBootDemo.customer.Customer;
import com.example.SpringBootDemo.customer.CustomerRepository;
import com.example.SpringBootDemo.customer_cart.CustomerCart;
import com.example.SpringBootDemo.customer_cart.CustomerCartRepository;
import com.example.SpringBootDemo.exception.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class CustomerOrderService {

    CustomerOrderRepository customerOrderRepository;
    CustomerOrderItemRepository customerOrderItemRepository;
    CustomerRepository customerRepository;
    CustomerCartRepository customerCartRepository;

    public CustomerOrder getCustomerOrderById(long customerId, long orderId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", customerId)));

        return customerOrderRepository.findByIdAndCustomer(orderId, customer)
                .orElseThrow(() -> new NotFoundException(String.format("Customer Order:{%d} is not found", orderId)));
    }

    public void createCustomerOrder(long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", customerId)));

        List<CustomerCart> customerCartList = customerCartRepository.findByCustomer(customer);

        CustomerOrder customerOrder = customerOrderRepository.save(
                CustomerOrder.builder()
                .customer(customer)
                .orderDateTime(LocalDateTime.now())
                .build()
        );

        List<CustomerOrderItem> customerOrderItemList = customerCartList.stream().map(cart ->
                CustomerOrderItem.builder()
                .customerOrder(customerOrder)
                .product(cart.getProduct())
                .quantity(cart.getQuantity())
                .build()
        ).toList();

        customerOrderItemRepository.saveAll(customerOrderItemList);

        customerCartRepository.deleteAll(customerCartList);
    }
}
