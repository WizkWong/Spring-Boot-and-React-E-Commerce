package com.example.SpringBootDemo.customer_order;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/customer/{id}/order")
public class CustomerOrderController {

    private final CustomerOrderService customerOrderService;

    @GetMapping(path = "/{order_id}")
    public CustomerOrder getCustomerOrderById(@PathVariable("id") long customerId, @PathVariable("order_id") long orderId) {
        return customerOrderService.getCustomerOrderById(customerId, orderId);
    }

    @PostMapping
    public void createCustomerOrder(@PathVariable("id") long customerId) {
        customerOrderService.createCustomerOrder(customerId);
    }
}
