package com.example.SpringBootDemo.customer_cart;

import com.example.SpringBootDemo.customer.Customer;
import com.example.SpringBootDemo.product.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "customer_cart",
    uniqueConstraints = {@UniqueConstraint(columnNames = {"customer_id", "product_id"})}
)
@Data
public class CustomerCart {
    @Id
    @SequenceGenerator(
            name = "carts_sequence",
            sequenceName = "carts_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "carts_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    private Integer quantity;
}
