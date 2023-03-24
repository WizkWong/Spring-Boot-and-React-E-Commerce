package com.example.SpringBootDemo.customer;

import com.example.SpringBootDemo.customer_cart.CustomerCart;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Getter
@Setter
public class CustomerDTO {

    @JsonProperty("customer_id")
    private Long id;
    private String username;
    private LocalDate dob;
    private Integer age;
    private String email;
    private String phoneNo;
    private List<CustomerCart> cart;

    public String getDob() {
        return dob.format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    }

    public Integer getAge() {
        return Period.between(this.dob, LocalDate.now()).getYears();
    }
}
