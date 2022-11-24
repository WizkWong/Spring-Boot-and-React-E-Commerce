package com.example.SpringBootDemo.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

//    @Query("FROM UserEntity WHERE username = ?1")
    Optional<UserEntity> findByUsername(String username);

}
