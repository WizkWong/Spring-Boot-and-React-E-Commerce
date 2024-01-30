package com.example.SpringBootDemo.customer;

import com.example.SpringBootDemo.exception.ForbiddenException;
import com.example.SpringBootDemo.exception.NotFoundException;
import com.example.SpringBootDemo.exception.NotValidException;
import com.example.SpringBootDemo.security.auth.AuthenticationResponse;
import com.example.SpringBootDemo.security.jwt.JwtService;
import com.example.SpringBootDemo.user.User;
import com.example.SpringBootDemo.user.UserRole;
import com.example.SpringBootDemo.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CustomerService {

    private final CustomerDTOMapper customerDTOMapper;
    private final CustomerMapper customerMapper;
    private final UserService userService;
    private final UserDetailsService userDetailsService;
    private final CustomerRepository customerRepository;
    private final JwtService jwtService;

    public CustomerDTO getCustomerById(long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", id)));

        return customerDTOMapper.apply(customer);
    }

    public CustomerDTO getCustomerByUsername(String username) {
        Customer customer = customerRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException(String.format("Customer Username:{%s} is not found", username)));

        return customerDTOMapper.apply(customer);
    }

    // get profile by username, which extract from token
    public CustomerDTO getCustomerByToken(String token) {
        final String username = jwtService.extractUsername(jwtService.extractBearerToken(token));
        return this.getCustomerByUsername(username);
    }

    public List<CustomerDTO> getAllCustomers() {
        return customerRepository.findAll()
                .stream()
                .map(customerDTOMapper)
                .collect(Collectors.toList());
    }

    public Customer createCustomer(Customer customer) {
        // validate user and customer object
        validateCustomer(customer);

        // set staff and superuser to false
        customer.getUser().setRole(UserRole.CUSTOMER);

        // create and save user first
        User user = userService.createUser(customer.getUser());

        // create and save customer
        customer.setId(user.getId());
        customer.setUser(user);

        return customerRepository.save(customer);
    }


    public AuthenticationResponse updateCustomerWithToken(String token, CustomerDTO customerDTO) {
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
        this.updateCustomer(existCustomer.getId(), customer);

        // generate a token
        final String jwtToken = jwtService.generateToken(
                userDetailsService.loadUserByUsername(customerDTO.getUsername())
        );
        // response with token
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .userId(customer.getId())
                .username(customer.getUser().getUsername())
                .build();
    }

    @Transactional
    public void updateCustomer(long id, Customer customer) {
        // check customer exist or not
        Customer oldCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", id)));

        // validate user and customer object
        validateCustomer(customer);

        // update user
        userService.updateUser(oldCustomer.getUser(), customer.getUser());

        // set value and save into database
        if (!Objects.equals(oldCustomer.getDob(), customer.getDob())) {
            oldCustomer.setDob(customer.getDob());
        }
    }

    public void validateCustomer(Customer customer) {
        StringBuilder errorMsg = userService.validateUser(customer.getUser());

        LocalDate dob = customer.getDob();

        if (dob == null) {
            errorMsg.append("Date of birth cannot be empty; ");
        }

        if (!errorMsg.isEmpty()) {
            throw new NotValidException(errorMsg.toString());
        }

    }

    public void deleteCustomer(long id) {
        if (!customerRepository.existsById(id)) {
            throw new NotFoundException(String.format("Customer ID:{%d} is not found", id));
        }
        customerRepository.deleteById(id);
    }

}
