package com.example.SpringBootDemo.product;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "product")
public class ProductEntity {
    @Id
    @SequenceGenerator(
            name = "products_sequence",
            sequenceName = "products_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "products_sequence"
    )

    @Column(
            name = "id",
            updatable = false
    )
    long id;
    String name;
    double price;
    LocalDateTime created_datetime;

    public ProductEntity(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public ProductEntity() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public LocalDateTime getCreated_datetime() {
        return created_datetime;
    }

    public void setCreated_datetime(LocalDateTime created_datetime) {
        this.created_datetime = created_datetime;
    }
}
