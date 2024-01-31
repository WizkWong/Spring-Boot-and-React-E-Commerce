package com.example.SpringBootDemo.customer_order;

import com.example.SpringBootDemo.product.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "customer_order_item",
    uniqueConstraints = {@UniqueConstraint(columnNames = {"customer_order_id", "product_id"})}
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerOrderItem {
    @JsonIgnore
    @Id
    @SequenceGenerator(
            name = "order_item_sequence",
            sequenceName = "order_item_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "order_item_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "customer_order_id")
    private CustomerOrder customerOrder;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private Integer quantity;
}
