package com.example.SpringBootDemo.user;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/user")
public class UserController {

    private final UserService userService;

    @GetMapping(path = "/get/id/{id}")
    public User getUserByUsername(@PathVariable("id") long id) {
        return userService.getUserById(id);
    }

    @GetMapping(path = "/get/username/{username}")
    public User getUserByUsername(@PathVariable("username") String username) {
        return userService.getUserByUsername(username);
    }

    @GetMapping(path = "/getall")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
