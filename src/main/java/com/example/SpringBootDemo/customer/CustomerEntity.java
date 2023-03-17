package com.example.SpringBootDemo.customer;

import javax.persistence.*;
import com.example.SpringBootDemo.user.UserEntity;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.Period;

@Entity
@Table(name = "customer")
@Data
@NoArgsConstructor
public class CustomerEntity {

    @Id
    @Column(
            name = "person_id",
            updatable = false
    )
    private long id;

    @OneToOne(cascade = CascadeType.ALL)
    @MapsId("person_id")
    @JoinColumn(name = "person_id")
    private UserEntity userEntity;

    private LocalDate dob;

    @Transient
    private Integer age;

    private String card;

    public Integer getAge() {
        return Period.between(this.dob, LocalDate.now()).getYears();
    }
}
