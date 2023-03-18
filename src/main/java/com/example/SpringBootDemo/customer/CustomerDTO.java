package com.example.SpringBootDemo.customer;

import com.example.SpringBootDemo.customer_cart.CustomerCart;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Getter
@Setter
public class CustomerDTO {

    private Long customerId;
    private String username;
    private LocalDate dob;
    private Integer age;
    private String email;
    private String phoneNo;
    private List<CustomerCart> cart;

    public Integer getAge() {
        return Period.between(this.dob, LocalDate.now()).getYears();
    }
}
