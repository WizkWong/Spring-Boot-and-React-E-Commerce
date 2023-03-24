package com.example.SpringBootDemo.customer;

import com.example.SpringBootDemo.customer_cart.CustomerCartRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@AllArgsConstructor
public class CustomerDTOMapper implements Function<Customer, CustomerDTO> {

    private final ModelMapper modelMapper;
    private final CustomerCartRepository customerCartRepository;

    @Override
    public CustomerDTO apply(Customer customer) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        CustomerDTO customerDTO = modelMapper.map(customer, CustomerDTO.class);
        customerDTO.setCart(customerCartRepository.findByCustomer(customer));
        return customerDTO;
    }
}
