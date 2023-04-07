package com.example.SpringBootDemo.customer;

import javax.persistence.*;

import com.example.SpringBootDemo.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "customer")
@Data
@NoArgsConstructor
public class Customer {

    @Id
    @Column(
            name = "person_id",
            updatable = false
    )
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @MapsId("person_id")
    @JoinColumn(name = "person_id")
    private User user;

    private LocalDate dob;

    @Transient
    private Integer age;

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public void setDob(String dob) {
        this.dob = LocalDate.parse(dob, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
    }

    public Integer getAge() {
        return Period.between(this.dob, LocalDate.now()).getYears();
    }
}
