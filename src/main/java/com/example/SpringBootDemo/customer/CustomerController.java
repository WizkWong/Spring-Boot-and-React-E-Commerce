package com.example.SpringBootDemo.customer;

import com.example.SpringBootDemo.security.auth.AuthenticationResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @GetMapping(path = "/profile")
    public CustomerDTO getCustomerProfile(@RequestHeader(name = "Authorization") String token) {
        return customerService.getCustomerByToken(token);
    }

    @GetMapping
    public List<CustomerDTO> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        return ResponseEntity.status(HttpStatus.CREATED).body(customerService.createCustomer(customer));
    }

    @PutMapping(path = "/update-profile")
    public ResponseEntity<AuthenticationResponse> updateCustomerProfile(
            @RequestHeader(name = "Authorization") String token,
            @RequestBody CustomerDTO customerDTO) {
        return ResponseEntity.ok().body(customerService.updateCustomerWithToken(token, customerDTO));
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
