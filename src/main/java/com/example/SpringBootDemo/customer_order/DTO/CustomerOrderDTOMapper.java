package com.example.SpringBootDemo.customer_order.DTO;

import com.example.SpringBootDemo.customer_order.CustomerOrder;
import com.example.SpringBootDemo.customer_order.CustomerOrderItem;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@AllArgsConstructor
public class CustomerOrderDTOMapper implements Function<CustomerOrder, CustomerOrderDTO> {

    @Override
    public CustomerOrderDTO apply(CustomerOrder customerOrder) {
        return CustomerOrderDTO.builder()
                .id(customerOrder.getId())
                .totalPrice(customerOrder.getOrderItemsList()
                        .stream()
                        .parallel()
                        .mapToDouble(orderItem -> orderItem.getQuantity() * orderItem.getProduct().getPrice())
                        .sum()
                )
                .totalUniqueItems(customerOrder.getOrderItemsList().size())
                .totalItems(customerOrder.getOrderItemsList()
                        .stream()
                        .parallel()
                        .mapToInt(CustomerOrderItem::getQuantity)
                        .sum()
                )
                .orderDateTime(customerOrder.getOrderDateTime())
                .build();
    }
}
