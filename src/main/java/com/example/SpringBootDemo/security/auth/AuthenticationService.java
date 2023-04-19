package com.example.SpringBootDemo.security.auth;

import com.example.SpringBootDemo.customer.Customer;
import com.example.SpringBootDemo.customer.CustomerDTO;
import com.example.SpringBootDemo.customer.CustomerService;
import com.example.SpringBootDemo.customer_cart.CustomerCart;
import com.example.SpringBootDemo.customer_cart.CustomerCartService;
import com.example.SpringBootDemo.security.jwt.JwtService;
import com.example.SpringBootDemo.security.userdetails.CustomUserDetails;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AuthenticationService {

    private final CustomerService customerService;
    private final CustomerCartService customerCartService;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public AuthenticationResponse register(Customer customer) {
        Customer newCustomer = customerService.createCustomer(customer);

        final String jwtToken = jwtService.generateToken(
                new CustomUserDetails(newCustomer.getUser())
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

    public CustomerDTO getProfile(String token) {
        final String username = jwtService.extractUsername(jwtService.extractBearerToken(token));
        return customerService.getCustomerByUsername(username);
    }

    public List<CustomerCart> getCustomerCart(String token) {
        final String username = jwtService.extractUsername(jwtService.extractBearerToken(token));
        return customerCartService.getCustomerCartByUsername(username);
    }
}
