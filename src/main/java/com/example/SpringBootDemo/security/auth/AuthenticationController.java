package com.example.SpringBootDemo.security.auth;

import com.example.SpringBootDemo.customer.Customer;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/auth")
@AllArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody Customer customer) {
        AuthenticationResponse response;
        return (response = authenticationService.register(customer)) != null ?
                ResponseEntity.status(HttpStatus.CREATED).body(response)
                :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok().body(
                authenticationService.authenticate(request)
        );
    }
}
