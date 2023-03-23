package com.example.SpringBootDemo.customer_cart;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/customer/{id}/cart")
public class CustomerCartController {

    private final CustomerCartService customerCartService;

    @GetMapping
    public List<CustomerCart> getCustomerCartById(@PathVariable("id") long id) {
        return customerCartService.getCustomerCartById(id);
    }

    @PutMapping
    public void addCustomerCart(@PathVariable("id") long id, @RequestBody CustomerCart customerCart) {
        customerCartService.addCustomerCart(id, customerCart);
    }

    @PutMapping(path = "/update")
    public void updateCustomerCart(@PathVariable("id") long id, @RequestBody List<CustomerCart> customerCartList) {
        customerCartService.updateCustomerCart(id, customerCartList);
    }
}
