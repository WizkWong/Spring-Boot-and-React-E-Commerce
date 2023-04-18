package com.example.SpringBootDemo.customer;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@AllArgsConstructor
public class CustomerDTOMapper implements Function<Customer, CustomerDTO> {

    private final ModelMapper modelMapper;

    @Override
    public CustomerDTO apply(Customer customer) {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(customer, CustomerDTO.class);
    }
}
