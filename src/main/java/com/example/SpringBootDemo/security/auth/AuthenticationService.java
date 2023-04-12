package com.example.SpringBootDemo.security.auth;

import com.example.SpringBootDemo.customer.Customer;
import com.example.SpringBootDemo.customer.CustomerService;
import com.example.SpringBootDemo.security.jwt.JwtService;
import com.example.SpringBootDemo.security.userdetails.CustomUserDetails;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthenticationService {

    private final CustomerService customerService;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public AuthenticationResponse register(Customer customer) {
        ResponseEntity<Customer> responseCustomer = customerService.createCustomer(customer);

        if (responseCustomer.getStatusCode() != HttpStatus.CREATED) {
            return null;
        }
        final String jwtToken = jwtService.generateToken(
                new CustomUserDetails(responseCustomer.getBody().getUser())
        );
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
        ));

        final String jwtToken = jwtService.generateToken(
                userDetailsService.loadUserByUsername(request.getUsername())
        );
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}
