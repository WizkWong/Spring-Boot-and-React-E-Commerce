package com.example.SpringBootDemo.user;

import java.time.LocalDateTime;

public class User {

    private long id;
    private String username;
    private String password;
    private String email;
    private String phoneNo;
    private boolean staff;
    private boolean superuser;
    private LocalDateTime created_datetime;

    public User() {}

    public User(String username, String password, String email, String phoneNo, boolean staff, boolean superuser) {
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
