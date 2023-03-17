package com.example.SpringBootDemo.customer_cart;

import com.example.SpringBootDemo.customer.CustomerEntity;
import com.example.SpringBootDemo.customer.CustomerRepository;
import com.example.SpringBootDemo.exception.NotFoundException;
import com.example.SpringBootDemo.product.ProductEntity;
import com.example.SpringBootDemo.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerCartService {

    public final CustomerRepository customerRepository;
    public final CustomerCartRepository customerCartRepository;
    public final ProductRepository productRepository;

    @Autowired
    public CustomerCartService(CustomerRepository customerRepository, CustomerCartRepository customerCartRepository, ProductRepository productRepository) {
        this.customerRepository = customerRepository;
        this.customerCartRepository = customerCartRepository;
        this.productRepository = productRepository;
    }

    public List<CustomerCartEntity> getCustomerCartById(long id) {
        CustomerEntity customerEntity = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", id)));

        return customerCartRepository.findByCustomer(customerEntity);
    }

    @Transactional
    public void addCustomerCartById(long id, CustomerCartEntity customerCartEntity) {
        CustomerEntity customer = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", id)));

        Optional<CustomerCartEntity> existCartItem = customerCartRepository.findByCustomerAndProduct(customer, customerCartEntity.getProduct());
        if (existCartItem.isPresent()) {
            CustomerCartEntity cartItem = existCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + customerCartEntity.getQuantity());
            return;
        }
        ProductEntity productEntity = productRepository.findById(customerCartEntity.getProduct().getId())
                .orElseThrow(() -> new NotFoundException(String.format("Product ID:{%d} is not found", id)));
        customerCartEntity.setCustomer(customer);
        customerCartEntity.setProduct(productEntity);
        customerCartRepository.save(customerCartEntity);
    }
}
