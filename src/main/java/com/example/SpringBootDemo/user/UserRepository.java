package com.example.SpringBootDemo.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

//    @Query("FROM UserEntity WHERE username = ?1")
    Optional<User> findByUsername(String username);

    Optional<User> findByRole(UserRole role);

}
