package com.example.SpringBootDemo.customer;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/customer")
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping(path = "/{id}")
    public CustomerDTO getCustomerById(@PathVariable("id") long id) {
        return customerService.getCustomerById(id);
    }

    @GetMapping
    public List<CustomerDTO> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        return customerService.createCustomer(customer);
    }

    @PutMapping(path = "/{id}")
    public void updateCustomer(@PathVariable("id") long id, @RequestBody Customer customer) {
        customerService.updateCustomer(id, customer);
    }

    @DeleteMapping(path = "/{id}")
    public void deleteCustomer(@PathVariable("id") long id) {
        customerService.deleteCustomer(id);
    }
}
