package com.example.SpringBootDemo.customer;

import com.example.SpringBootDemo.customer_cart.CustomerCartRepository;
import com.example.SpringBootDemo.exception.NotFoundException;
import com.example.SpringBootDemo.exception.ValidationFailException;
import com.example.SpringBootDemo.user.User;
import com.example.SpringBootDemo.user.UserService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CustomerService {

    private final ModelMapper modelMapper;
    private final UserService userService;
    private final CustomerRepository customerRepository;
    private final CustomerCartRepository customerCartRepository;

    public CustomerDTO getCustomerById(long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", id)));

        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        CustomerDTO customerDTO = modelMapper.map(customer, CustomerDTO.class);
        customerDTO.setCart(customerCartRepository.findByCustomer(customer));
        return customerDTO;
    }

    public List<CustomerDTO> getAllCustomers() {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return customerRepository.findAll()
                .stream()
                .map(customer -> {
                    CustomerDTO customerDTO = modelMapper.map(customer, CustomerDTO.class);
                    customerDTO.setCart(customerCartRepository.findByCustomer(customer));
                    return customerDTO;
                })
                .collect(Collectors.toList());
    }

    public ResponseEntity<Customer> createCustomer(Customer customer) {
        // validate user and customer object
        validateCustomer(customer);

        // set staff and superuser to false
        customer.getUser().setStaff(false);
        customer.getUser().setSuperuser(false);

        // create and save user first
        User user = userService.createUser(customer.getUser());

        // create and save customer
        customer.setId(user.getId());
        customer.setUser(user);
        customer = customerRepository.save(customer);

        return ResponseEntity.status(HttpStatus.CREATED).body(customer);
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

        if (!Objects.equals(oldCustomer.getCard(), customer.getCard())) {
            oldCustomer.setCard(customer.getCard());
        }
    }

    public void validateCustomer(Customer customer) {
        StringBuilder errorMsg = userService.validateUser(customer.getUser());

        LocalDate dob = customer.getDob();
        String card = customer.getCard();

        if (dob == null) {
            errorMsg.append("Date of birth cannot be empty; ");
        }

        // need to modify that add card class
        if (card == null || card.length() <= 0) {
            errorMsg.append("Card cannot be empty or is not valid; ");
        }

        if (!errorMsg.isEmpty()) {
            throw new ValidationFailException(errorMsg.toString());
        }

    }

    public void deleteCustomer(long id) {
        if (!customerRepository.existsById(id)) {
            throw new NotFoundException(String.format("Customer ID:{%d} is not found", id));
        }
        customerRepository.deleteById(id);
    }

}
