package com.example.SpringBootDemo.user;

import com.example.SpringBootDemo.customer.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "/get/id/{id}")
    public UserEntity getUserByUsername(@PathVariable("id") long id) {
        return userService.getUserById(id);
    }

    @GetMapping(path = "/get/username/{username}")
    public UserEntity getUserByUsername(@PathVariable("username") String username) {
        return userService.getUserByUsername(username);
    }

    @GetMapping(path = "/getall")
    public List<UserEntity> getAllUsers() {
        return userService.getAllUsers();
    }
}
