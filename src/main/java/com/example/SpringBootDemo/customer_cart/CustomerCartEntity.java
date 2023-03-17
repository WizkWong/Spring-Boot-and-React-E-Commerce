package com.example.SpringBootDemo.customer_cart;

import com.example.SpringBootDemo.customer.CustomerEntity;
import com.example.SpringBootDemo.product.ProductEntity;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "customer_cart",
    uniqueConstraints = {@UniqueConstraint(columnNames = {"customer_id", "product_id"})}
)
@Data
public class CustomerCartEntity {
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
    private long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity product;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private CustomerEntity customer;

    private int quantity;
}
