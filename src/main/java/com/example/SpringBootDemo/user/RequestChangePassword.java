package com.example.SpringBootDemo.user;

public record RequestChangePassword(
        String oldPassword,
        String newPassword
) {
}
