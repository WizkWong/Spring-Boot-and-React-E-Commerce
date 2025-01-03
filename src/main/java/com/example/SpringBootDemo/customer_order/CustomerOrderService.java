package com.example.SpringBootDemo.customer_order;

import com.example.SpringBootDemo.customer.Customer;
import com.example.SpringBootDemo.customer.CustomerRepository;
import com.example.SpringBootDemo.customer_cart.CustomerCart;
import com.example.SpringBootDemo.customer_cart.CustomerCartRepository;
import com.example.SpringBootDemo.customer_order.DTO.CustomerOrderDTO;
import com.example.SpringBootDemo.customer_order.DTO.CustomerOrderDTOMapper;
import com.example.SpringBootDemo.customer_order.DTO.CustomerOrderItemDTO;
import com.example.SpringBootDemo.customer_order.DTO.CustomerOrderItemDTOMapper;
import com.example.SpringBootDemo.exception.NotFoundException;
import com.example.SpringBootDemo.exception.NotValidException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CustomerOrderService {

    private final CustomerOrderRepository customerOrderRepository;
    private final CustomerOrderItemRepository customerOrderItemRepository;
    private final CustomerRepository customerRepository;
    private final CustomerCartRepository customerCartRepository;
    private final CustomerOrderItemDTOMapper customerOrderItemDTOMapper;
    private final CustomerOrderDTOMapper customerOrderDTOMapper;

    public List<CustomerOrderDTO> getAllCustomerOrder(long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", customerId)));

        return customerOrderRepository.findByCustomerOrderByOrderDateTimeDesc(customer)
                .stream()
                .map(customerOrderDTOMapper)
                .collect(Collectors.toList());
    }

    public List<CustomerOrderItemDTO> getCustomerOrderItemsById(long customerId, long orderId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", customerId)));

        CustomerOrder customerOrder = customerOrderRepository.findByIdAndCustomer(orderId, customer)
                .orElseThrow(() -> new NotFoundException(String.format("Customer Order:{%d} is not found", orderId)));

        return customerOrder.getOrderItemsList()
                .stream()
                .map(customerOrderItemDTOMapper)
                .collect(Collectors.toList());
    }

    public void createCustomerOrder(long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", customerId)));

        List<CustomerCart> customerCartList = customerCartRepository.findByCustomer(customer);

        if (customerCartList.isEmpty()) {
            throw new NotValidException(String.format("Customer ID:{%d} cart is empty!", customerId));
        }

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
