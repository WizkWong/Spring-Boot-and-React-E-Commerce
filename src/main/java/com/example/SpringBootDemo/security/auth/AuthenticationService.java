package com.example.SpringBootDemo.security.auth;

import com.example.SpringBootDemo.customer.*;
import com.example.SpringBootDemo.exception.ForbiddenException;
import com.example.SpringBootDemo.exception.NotFoundException;
import com.example.SpringBootDemo.security.jwt.JwtService;
import com.example.SpringBootDemo.security.userdetails.CustomUserDetails;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthenticationService {

    private final CustomerService customerService;
    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper;
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
        return AuthenticationResponse.builder().token(jwtToken).build();
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
        // response with token
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    // get profile by username, which extract from token
    public CustomerDTO getProfile(String token) {
        final String username = jwtService.extractUsername(jwtService.extractBearerToken(token));
        return customerService.getCustomerByUsername(username);
    }

    public AuthenticationResponse updateProfile(String token, CustomerDTO customerDTO) {
        final String username = jwtService.extractUsername(jwtService.extractBearerToken(token));

        // get customer from username, which extract from token
        Customer existCustomer = customerRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException(String.format("Customer Username:{%s} is not found", username)));

        // check customer id match with current customer id
        if (!existCustomer.getId().equals(customerDTO.getId())) {
            throw new ForbiddenException("ID is not match to request body ID");
        }

        // convert customerDTO to customer entity
        Customer customer = customerMapper.apply(customerDTO);

        // update customer
        customerService.updateCustomer(existCustomer.getId(), customer);

        // generate a token
        final String jwtToken = jwtService.generateToken(
                userDetailsService.loadUserByUsername(customerDTO.getUsername())
        );
        // response with token
        return AuthenticationResponse.builder().token(jwtToken).build();
    }
}
