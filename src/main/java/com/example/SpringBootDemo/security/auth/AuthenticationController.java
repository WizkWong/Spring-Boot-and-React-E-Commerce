package com.example.SpringBootDemo.security.auth;

import com.example.SpringBootDemo.customer.Customer;
import com.example.SpringBootDemo.customer.CustomerDTO;
import com.example.SpringBootDemo.customer_cart.CustomerCart;
import com.example.SpringBootDemo.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@AllArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("auth/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody Customer customer) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authenticationService.register(customer));
    }

    @PostMapping("auth/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok().body(authenticationService.authenticate(request));
    }

    @GetMapping("/profile")
    public CustomerDTO getProfile(@RequestHeader(name = "Authorization") String token) {
        return authenticationService.getProfile(token);
    }

    @GetMapping("/cart")
    public List<CustomerCart> getCustomerCart(@RequestHeader(name = "Authorization") String token) {
        return authenticationService.getCustomerCart(token);
    }
}
