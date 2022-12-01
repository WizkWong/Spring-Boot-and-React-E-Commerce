package com.example.SpringBootDemo.customer;

import com.example.SpringBootDemo.exception.NotFoundException;
import com.example.SpringBootDemo.exception.ValidationFailException;
import com.example.SpringBootDemo.user.UserEntity;
import com.example.SpringBootDemo.user.UserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    private final ModelMapper modelMapper;
    private final UserService userService;
    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(ModelMapper modelMapper, UserService userService, CustomerRepository customerRepository) {
        this.modelMapper = modelMapper;
        this.userService = userService;
        this.customerRepository = customerRepository;
    }

    public CustomerDTO getCustomerById(long id) {
        CustomerEntity customerEntity = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", id)));

        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(customerEntity, CustomerDTO.class);
    }

    public List<CustomerDTO> getAllCustomers() {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return customerRepository.findAll()
                .stream()
                .map(customerEntity -> modelMapper.map(customerEntity, CustomerDTO.class))
                .collect(Collectors.toList());
    }

    public ResponseEntity<CustomerEntity> createCustomer(Customer customer) {
        // validate user and customer object
        validateCustomer(customer);

        // set staff and superuser to false
        customer.getUser().setStaff(false);
        customer.getUser().setSuperuser(false);

        // create and save user first
        UserEntity userEntity = userService.createUser(customer.getUser());

        // create and save customer
        CustomerEntity customerEntity = new CustomerEntity();
        BeanUtils.copyProperties(customer, customerEntity);
        customerEntity.setId(userEntity.getId());
        customerEntity.setUserEntity(userEntity);
        customerEntity = customerRepository.save(customerEntity);

        return ResponseEntity.status(HttpStatus.CREATED).body(customerEntity);
    }

    @Transactional
    public void updateCustomer(long id, Customer customer) {
        // check customer exist or not
        CustomerEntity customerEntity = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", id)));

        // validate user and customer object
        validateCustomer(customer);

        // update user
        userService.updateUser(customerEntity.getUserEntity(), customer.getUser());

        // set value and save into database
        if (!Objects.equals(customerEntity.getDob(), customer.getDob())) {
            customerEntity.setDob(customer.getDob());
        }

        if (!Objects.equals(customerEntity.getCard(), customer.getCard())) {
            customerEntity.setCard(customer.getCard());
        }
    }

    public void validateCustomer(Customer customer) {
        String errorMsg = userService.validateUser(customer.getUser());

        LocalDate dob = customer.getDob();
        String card = customer.getCard();

        if (dob == null) {
            errorMsg += "Date of birth cannot be empty; ";
        }

        // need to modify that add card class
        if (card == null || card.length() <= 0) {
            errorMsg += "Card cannot be empty or is not valid; ";
        }

        if (!errorMsg.isEmpty()) {
            throw new ValidationFailException(errorMsg);
        }

    }

    public void deleteCustomer(long id) {
        if (!customerRepository.existsById(id)) {
            throw new NotFoundException(String.format("Customer ID:{%d} is not found", id));
        }
        customerRepository.deleteById(id);
    }

}
