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
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CustomerCartService {

    private final CustomerRepository customerRepository;
    private final CustomerCartRepository customerCartRepository;
    private final ProductRepository productRepository;

    public List<CustomerCart> getCustomerCartById(long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", id)));

        return customerCartRepository.findByCustomer(customer);
    }

    public List<CustomerCart> getCustomerCartByUsername(String username) {
        Customer customer = customerRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException(String.format("Customer username:{%s} is not found", username)));

        return customerCartRepository.findByCustomer(customer);
    }

    @Transactional
    public void addCustomerCart(long id, CustomerCart customerCart) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", id)));
        // get specific cart item
        Optional<CustomerCart> existCartItem = customerCartRepository.findByCustomerAndProduct(customer, customerCart.getProduct());

        // if product exist in customer cart then update the quantity
        if (existCartItem.isPresent()) {
            CustomerCart cartItem = existCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + customerCart.getQuantity());
            return;
        }

        // if product does not exist in customer cart then add item into cart
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

        // get current customer cart
        List<CustomerCart> currCustomerCartList = customerCartRepository.findByCustomer(customer);

        currCustomerCartList.forEach(c ->
            customerCartList.stream().filter(
                    // check cart item exist in current customer cart
                    o -> o.getProduct().getId().equals(c.getProduct().getId())
            ).findAny().ifPresent(
                    // if exist then update cart item quantity
                    customerCart -> c.setQuantity(customerCart.getQuantity())
            )
        );
    }

    public void deleteCustomerCart(long id, List<CustomerCart> customerCartList) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", id)));

        // get all the cart item by matching product and customer
        customerCartList = customerCartList.stream().map(
                c -> customerCartRepository.findByCustomerAndProduct(customer, c.getProduct())
                    .orElse(null))
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList()
        );
        // delete cart items that have been found
        customerCartRepository.deleteAll(customerCartList);
    }
}
