package com.example.SpringBootDemo.user;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "person")
@Data
@NoArgsConstructor
public class User {

    @Id
    @SequenceGenerator(
            name = "users_sequence",
            sequenceName = "users_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "users_sequence"
    )

    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    @Column(
            name = "username",
            nullable = false
    )
    private String username;

    @Column(
            name = "password",
            nullable = false
    )
    private String password;

    private String email;

    private String phoneNo;

    @Column(
            name = "staff",
            nullable = false
    )
    private Boolean staff;

    @Column(
            name = "superuser",
            nullable = false
    )
    private Boolean superuser;

    @Column(
            name = "created_datetime",
            nullable = false
    )
    private LocalDateTime created_datetime;
}
