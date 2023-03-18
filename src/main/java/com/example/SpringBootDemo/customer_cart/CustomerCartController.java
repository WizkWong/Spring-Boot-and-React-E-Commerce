package com.example.SpringBootDemo.customer_cart;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/customer/{id}/cart")
public class CustomerCartController {

    private final CustomerCartService customerCartService;

    @GetMapping(path = "/get")
    public List<CustomerCart> getCustomerCartById(@PathVariable("id") long id) {
        return customerCartService.getCustomerCartById(id);
    }

    @PutMapping(path = "/add")
    public void addCustomerCartById(@PathVariable("id") long id, @RequestBody CustomerCart customerCart) {
        customerCartService.addCustomerCartById(id, customerCart);
    }

}
