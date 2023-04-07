package com.example.SpringBootDemo.customer;

import com.example.SpringBootDemo.exception.NotFoundException;
import com.example.SpringBootDemo.exception.ValidationFailException;
import com.example.SpringBootDemo.user.User;
import com.example.SpringBootDemo.user.UserService;
import lombok.AllArgsConstructor;
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

    private final CustomerDTOMapper customerDTOMapper;
    private final UserService userService;
    private final CustomerRepository customerRepository;

    public CustomerDTO getCustomerById(long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", id)));

        return customerDTOMapper.apply(customer);
    }

    public List<CustomerDTO> getAllCustomers() {
        return customerRepository.findAll()
                .stream()
                .map(customerDTOMapper)
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
    }

    public void validateCustomer(Customer customer) {
        StringBuilder errorMsg = userService.validateUser(customer.getUser());

        LocalDate dob = customer.getDob();

        if (dob == null) {
            errorMsg.append("Date of birth cannot be empty; ");
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
