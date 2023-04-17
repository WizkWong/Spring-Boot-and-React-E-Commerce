package com.example.SpringBootDemo.user;

public record RequestChangePassword(
        Long userId,
        String oldPassword,
        String newPassword
) {
}
