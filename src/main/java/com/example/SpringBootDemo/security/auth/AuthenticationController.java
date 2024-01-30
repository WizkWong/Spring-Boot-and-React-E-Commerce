package com.example.SpringBootDemo.security.auth;

import com.example.SpringBootDemo.customer.Customer;
import com.example.SpringBootDemo.customer.CustomerDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@AllArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping(path = "auth/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody Customer customer) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authenticationService.register(customer));
    }

    @PostMapping(path = "auth/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok().body(authenticationService.authenticate(request));
    }

}
