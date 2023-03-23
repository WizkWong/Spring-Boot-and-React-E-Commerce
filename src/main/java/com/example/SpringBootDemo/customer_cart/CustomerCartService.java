package com.example.SpringBootDemo.customer_cart;

import com.example.SpringBootDemo.customer.Customer;
import com.example.SpringBootDemo.customer.CustomerRepository;
import com.example.SpringBootDemo.exception.NotFoundException;
import com.example.SpringBootDemo.product.Product;
import com.example.SpringBootDemo.product.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CustomerCartService {

    public final CustomerRepository customerRepository;
    public final CustomerCartRepository customerCartRepository;
    public final ProductRepository productRepository;

    public List<CustomerCart> getCustomerCartById(long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", id)));

        return customerCartRepository.findByCustomer(customer);
    }

    @Transactional
    public void addCustomerCart(long id, CustomerCart customerCart) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", id)));

        Optional<CustomerCart> existCartItem = customerCartRepository.findByCustomerAndProduct(customer, customerCart.getProduct());
        if (existCartItem.isPresent()) {
            CustomerCart cartItem = existCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + customerCart.getQuantity());
            return;
        }
        Product product = productRepository.findById(customerCart.getProduct().getId())
                .orElseThrow(() -> new NotFoundException(String.format("Product ID:{%d} is not found", id)));
        customerCart.setCustomer(customer);
        customerCart.setProduct(product);
        customerCartRepository.save(customerCart);
    }

    @Transactional
    public void updateCustomerCart(long id, List<CustomerCart> customerCartList) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", id)));

        List<CustomerCart> currCustomerCartList = customerCartRepository.findByCustomer(customer);

        currCustomerCartList.forEach(c ->
            customerCartList.stream().filter(
                    o -> o.getProduct().getId().equals(c.getProduct().getId())
            ).findFirst().ifPresent(customerCart -> c.setQuantity(customerCart.getQuantity()))
        );
    }
}
