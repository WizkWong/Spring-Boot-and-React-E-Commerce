package com.example.SpringBootDemo.customer_cart;

import com.example.SpringBootDemo.product.ProductEntity;

import javax.persistence.*;

@Entity
@Table(name = "customer_cart",
    uniqueConstraints = {@UniqueConstraint(columnNames = {"customer_id", "product_id"})}
)
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
    private ProductEntity item;

    private int quantity;

    public CustomerCartEntity(long id, ProductEntity item, int quantity) {
        this.id = id;
        this.item = item;
        this.quantity = quantity;
    }

    public CustomerCartEntity() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public ProductEntity getItem() {
        return item;
    }

    public void setItem(ProductEntity item) {
        this.item = item;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
