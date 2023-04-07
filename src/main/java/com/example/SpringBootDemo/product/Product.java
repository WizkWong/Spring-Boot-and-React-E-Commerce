package com.example.SpringBootDemo.product;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Entity
@Table(name = "product")
@Data
@NoArgsConstructor
public class Product {
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
    @JsonProperty("product_id")
    private Long id;
    private String name;
    private Double price;
    private LocalDateTime created_datetime;

    public String getCreated_datetime() {
        return created_datetime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
