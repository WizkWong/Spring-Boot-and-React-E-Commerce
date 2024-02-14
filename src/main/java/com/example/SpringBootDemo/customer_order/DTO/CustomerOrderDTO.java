package com.example.SpringBootDemo.customer_order.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
@Builder
public class CustomerOrderDTO {

    private Long id;
    private LocalDateTime orderDateTime;
    private Integer totalUniqueItems;
    private Integer totalItems;

    public String getOrderDateTime() {
        return orderDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}