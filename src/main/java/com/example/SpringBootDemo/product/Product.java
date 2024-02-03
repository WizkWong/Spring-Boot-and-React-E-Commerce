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
    private String category;
    private Double price;
    @Lob
    private String image;
    private LocalDateTime createdDatetime;

    public String getCreatedDatetime() {
        return createdDatetime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    public void setCreatedDatetime(LocalDateTime createdDatetime) {
        this.createdDatetime = createdDatetime;
    }

    public void setCreatedDatetime(String created_datetime) {
        this.createdDatetime = LocalDateTime.parse(created_datetime, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
