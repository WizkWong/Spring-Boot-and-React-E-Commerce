package com.example.SpringBootDemo.customer;

import javax.persistence.*;
import com.example.SpringBootDemo.customer_cart.CustomerCartEntity;
import com.example.SpringBootDemo.user.UserEntity;
import java.time.LocalDate;
import java.time.Period;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "customer")
public class CustomerEntity {

    @Id
    @Column(
            name = "person_id",
            updatable = false
    )
    private long id;

    @OneToOne(cascade = CascadeType.ALL)
    @MapsId("person_id")
    @JoinColumn(name = "person_id")
    private UserEntity userEntity;

    private LocalDate dob;

    @Transient
    private Integer age;

    private String card;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "customer_id")
//    @JoinTable(
//            name = "customer_cart",
//            joinColumns = @JoinColumn( name = "customer_id"),
//            inverseJoinColumns = @JoinColumn( name = "cart_id")
//    )
    private Set<CustomerCartEntity> cart = new HashSet<>();

    public CustomerEntity(UserEntity userEntity, LocalDate dob, String card) {
        this.userEntity = userEntity;
        this.dob = dob;
        this.card = card;
    }

    public CustomerEntity() {}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public UserEntity getUserEntity() {
        return userEntity;
    }

    public void setUserEntity(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    public String getCard() {
        return card;
    }

    public void setCard(String card) {
        this.card = card;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public Integer getAge() {
        return Period.between(this.dob, LocalDate.now()).getYears();
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Set<CustomerCartEntity> getCart() {
        return cart;
    }

    public void setCart(Set<CustomerCartEntity> cart) {
        this.cart = cart;
    }
}
