package com.example.SpringBootDemo.customer;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@AllArgsConstructor
public class CustomerMapper implements Function<CustomerDTO, Customer> {

    private final ModelMapper modelMapper;

    @Override
    public Customer apply(CustomerDTO customerDTO) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(customerDTO, Customer.class);
    }
}
