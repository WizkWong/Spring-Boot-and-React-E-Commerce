package com.example.SpringBootDemo.customer_cart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/customer/cart")
public class CustomerCartController {

    private final CustomerCartService customerCartService;

    @Autowired
    public CustomerCartController(CustomerCartService customerCartService) {
        this.customerCartService = customerCartService;
    }

    @GetMapping(path = "/get/id/{id}")
    public List<CustomerCartEntity> getCustomerCartById(@PathVariable("id") long id) {
        return customerCartService.getCustomerCartById(id);
    }

    @PutMapping(path = "/add/id/{id}")
    public void addCustomerCartById(@PathVariable("id") long id, @RequestBody CustomerCartEntity customerCartEntity) {
        customerCartService.addCustomerCartById(id, customerCartEntity);
    }

}
