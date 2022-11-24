package com.example.SpringBootDemo.customer;

import com.example.SpringBootDemo.user.User;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Customer {

    private long id;
    private User user;
    private LocalDate dob;
    private String card;

    // when dob is LocalDate format
    public Customer(User user, LocalDate dob, String card) {
        this.user = user;
        this.dob = dob;
        this.card = card;
    }

    // when dob is String format
    public Customer(User user, String dob, String card) {
        this.user = user;
        this.dob = LocalDate.parse(dob, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        this.card = card;
    }

    public Customer() {
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

}
