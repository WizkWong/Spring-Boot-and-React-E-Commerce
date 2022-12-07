package com.example.SpringBootDemo.customer;

import com.example.SpringBootDemo.customer_cart.CustomerCartEntity;
import com.example.SpringBootDemo.user.User;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;

public class Customer {

    private long id;
    private User user;
    private LocalDate dob;
    private String card;
    private Set<CustomerCartEntity> cart = new HashSet<>();

    // when dob is LocalDate format
    public Customer(User user, LocalDate dob, String card, Set<CustomerCartEntity> cart) {
        this.user = user;
        this.dob = dob;
        this.card = card;
        this.cart = cart;
    }

    // when dob is String format
    public Customer(User user, String dob, String card, Set<CustomerCartEntity> cart) {
        this.user = user;
        this.dob = parseToLocalDate(dob);
        this.card = card;
        this.cart = cart;
    }

    public Customer() {
    }

    public LocalDate parseToLocalDate(String dob) {
        return LocalDate.parse(dob, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public void setDob(String dob) {
        this.dob = LocalDate.parse(dob, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    }

    public String getCard() {
        return card;
    }

    public void setCard(String card) {
        this.card = card;
    }

    public Set<CustomerCartEntity> getCart() {
        return cart;
    }

    public void setCart(Set<CustomerCartEntity> cart) {
        this.cart = cart;
    }
}
