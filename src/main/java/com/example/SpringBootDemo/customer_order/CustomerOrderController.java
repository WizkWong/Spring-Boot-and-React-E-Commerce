package com.example.SpringBootDemo.customer_order;

import com.example.SpringBootDemo.customer_order.DTO.CustomerOrderDTO;
import com.example.SpringBootDemo.customer_order.DTO.CustomerOrderItemDTO;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/customer/{id}/order")
public class CustomerOrderController {

    private final CustomerOrderService customerOrderService;

    @GetMapping
    public List<CustomerOrderDTO> getAllCustomerOrder(@PathVariable("id") long customerId) {
        return customerOrderService.getAllCustomerOrder(customerId);
    }

    @GetMapping(path = "/{order_id}/items")
    public List<CustomerOrderItemDTO> getCustomerOrderItemsById(@PathVariable("id") long customerId, @PathVariable("order_id") long orderId) {
        return customerOrderService.getCustomerOrderItemsById(customerId, orderId);
    }

    @PostMapping
    public void createCustomerOrder(@PathVariable("id") long customerId) {
        customerOrderService.createCustomerOrder(customerId);
    }
}
