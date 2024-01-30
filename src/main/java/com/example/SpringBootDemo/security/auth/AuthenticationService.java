package com.example.SpringBootDemo.security.auth;

import com.example.SpringBootDemo.customer.Customer;
import com.example.SpringBootDemo.customer.CustomerService;
import com.example.SpringBootDemo.exception.NotFoundException;
import com.example.SpringBootDemo.security.jwt.JwtService;
import com.example.SpringBootDemo.security.userdetails.CustomUserDetails;
import com.example.SpringBootDemo.user.User;
import com.example.SpringBootDemo.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthenticationService {

    private final CustomerService customerService;
    private final UserRepository userRepository;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public AuthenticationResponse register(Customer customer) {
        // create customer
        Customer newCustomer = customerService.createCustomer(customer);

        // generate a token
        final String jwtToken = jwtService.generateToken(
                new CustomUserDetails(newCustomer.getUser())
        );
        // response with token
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userId(newCustomer.getId())
                .username(newCustomer.getUser().getUsername())
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        // authenticate the user
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
        ));
        // generate a token
        final String jwtToken = jwtService.generateToken(
                userDetailsService.loadUserByUsername(request.getUsername())
        );
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new NotFoundException(String.format("Username:{%s} is not found", request.getUsername())));

        // response with token
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userId(user.getId())
                .username(user.getUsername())
                .build();
    }

}
