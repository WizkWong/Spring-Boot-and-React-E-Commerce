package com.example.SpringBootDemo.user;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "person")
public class UserEntity {

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
    private long id;

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
    private boolean staff;

    @Column(
            name = "superuser",
            nullable = false
    )
    private boolean superuser;

    @Column(
            name = "created_datetime",
            nullable = false
    )
    private LocalDateTime created_datetime;

    public UserEntity() {}

    public UserEntity(String username, String password, String email, String phoneNo, boolean staff, boolean superuser) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.phoneNo = phoneNo;
        this.staff = staff;
        this.superuser = superuser;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public boolean isStaff() {
        return staff;
    }

    public void setStaff(boolean staff) {
        this.staff = staff;
    }

    public boolean isSuperuser() {
        return superuser;
    }

    public void setSuperuser(boolean superuser) {
        this.superuser = superuser;
    }

    public LocalDateTime getCreated_datetime() {
        return created_datetime;
    }

    public void setCreated_datetime(LocalDateTime created_datetime) {
        this.created_datetime = created_datetime;
    }
}
