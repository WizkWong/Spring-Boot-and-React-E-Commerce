package com.example.SpringBootDemo.customer_visit;

import com.example.SpringBootDemo.customer.Customer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "customer_visit")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerVisit {
    @Id
    @SequenceGenerator(
            name = "customer_visit_sequence",
            sequenceName = "customer_visit_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "customer_visit_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    private String category;

    private Integer visitedCount;

    private LocalDateTime visitedDateTime;

    public void incrementVisitedCount() {
        this.visitedCount++;
    }
}
