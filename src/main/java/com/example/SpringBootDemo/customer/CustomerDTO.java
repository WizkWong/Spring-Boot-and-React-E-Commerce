package com.example.SpringBootDemo.customer;

import com.example.SpringBootDemo.customer_cart.CustomerCartEntity;

import java.time.LocalDate;
import java.time.Period;
import java.util.Set;

public class CustomerDTO {

    private long customerId;
    private String username;
    private LocalDate dob;
    private Integer age;
    private String email;
    private String phoneNo;
    private Set<CustomerCartEntity> cart;

    public long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(long customerId) {
        this.customerId = customerId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public Integer getAge() {
        return Period.between(this.dob, LocalDate.now()).getYears();
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public Set<CustomerCartEntity> getCart() {
        return cart;
    }

    public void setCart(Set<CustomerCartEntity> cart) {
        this.cart = cart;
    }
}
