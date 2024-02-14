package com.example.SpringBootDemo.customer;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

@Getter
@Setter
public class CustomerDTO {

    @JsonProperty("customer_id")
    private Long id;
    private String username;
    private LocalDate dob;
    private String email;
    private String phoneNo;

    public String getDob() {
        return dob.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public void setDob(String dob) {
        this.dob = LocalDate.parse(dob, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    public Integer getAge() {
        return Period.between(this.dob, LocalDate.now()).getYears();
    }
}
