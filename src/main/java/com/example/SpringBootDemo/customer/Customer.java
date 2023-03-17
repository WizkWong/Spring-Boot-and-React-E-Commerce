package com.example.SpringBootDemo.customer;

import com.example.SpringBootDemo.user.User;
import lombok.Data;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Data
public class Customer {

    private long id;
    private User user;
    private LocalDate dob;
    private String card;

    // when dob is String format
    public Customer(User user, String dob, String card) {
        this.user = user;
        this.dob = parseToLocalDate(dob);
        this.card = card;
    }

    public Customer() {
    }

    public LocalDate parseToLocalDate(String dob) {
        return LocalDate.parse(dob, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    }

    public void setDob(String dob) {
        this.dob = LocalDate.parse(dob, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    }
}
