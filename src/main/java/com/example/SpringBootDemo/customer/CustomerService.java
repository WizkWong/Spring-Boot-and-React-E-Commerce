package com.example.SpringBootDemo.customer;

import com.example.SpringBootDemo.exception.NotFoundException;
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

import java.util.List;
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
        UserEntity userEntity = userService.createUser(customer.getUser());

        CustomerEntity customerEntity = new CustomerEntity();
        BeanUtils.copyProperties(customer, customerEntity);
        customerEntity.setId(userEntity.getId());
        customerEntity.setUserEntity(userEntity);
        customerRepository.save(customerEntity);

        return ResponseEntity.status(HttpStatus.CREATED).body(customerRepository.save(customerEntity));
    }

    @Transactional
    public void updateCustomer(long id, Customer customer) {
        CustomerEntity customerEntity = customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("Customer ID:{%d} is not found", id)));

        userService.updateUser(customerEntity.getUserEntity(), customer.getUser());
        customerEntity.setDob(customer.getDob());
        customerEntity.setCard(customer.getCard());
    }

    public void deleteCustomer(long id) {
        if (!customerRepository.existsById(id)) {
            throw new NotFoundException(String.format("Customer ID:{%d} is not found", id));
        }
        customerRepository.deleteById(id);
    }

}
