package com.example.SpringBootDemo.user;

import com.example.SpringBootDemo.exception.DuplicateException;
import com.example.SpringBootDemo.exception.NotFoundException;
import com.example.SpringBootDemo.exception.ValidationFailException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.regex.Pattern;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity getUserById(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("User ID:{%d} is not found", id)));
    }

    public UserEntity getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException(String.format("Username {%s} is not found", username)));
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    public UserEntity createUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new DuplicateException("User is taken");
        }
        user.setCreated_datetime(LocalDateTime.now());
        UserEntity userEntity = new UserEntity();

        BeanUtils.copyProperties(user, userEntity);
        userRepository.save(userEntity);

        return userEntity;
    }

    @Transactional
    public void updateUser(UserEntity userEntity, User user) {
        if (!Objects.equals(userEntity.getUsername(), user.getUsername())) {

            if (userRepository.findByUsername(user.getUsername()).isPresent()) {
                throw new DuplicateException("User is taken");
            }
            userEntity.setUsername(user.getUsername());
        }

        if (!Objects.equals(userEntity.getPassword(), user.getPassword())) {
            userEntity.setPassword(user.getPassword());
        }

        if (!Objects.equals(userEntity.getEmail(), user.getEmail())) {
            userEntity.setEmail(user.getEmail());
        }

        if (!Objects.equals(userEntity.getPhoneNo(), user.getPhoneNo())) {
            userEntity.setPhoneNo(user.getPhoneNo());
        }
    }

    public String validateUser(User user) {
        String errorMsg = "";

        String username = user.getUsername();
        String password = user.getPassword();
        String email = user.getEmail();
        String phoneNo = user.getPhoneNo();

        Pattern validEmailAddress = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

        if (username == null || username.length() < 4) {
            errorMsg += "Username cannot be empty or must more than or equal 4 character; ";
        }

        if (password == null || password.length() < 8) {
            errorMsg += "Password cannot be empty or must at least 8 password length; ";
        }

        if (email == null || !validEmailAddress.matcher(email).matches()) {
            errorMsg += "Email cannot be empty or is in wrong format; ";
        }

        if (phoneNo == null || phoneNo.length() <= 0) {
            errorMsg += "Phone number cannot be empty or does not valid; ";
        }

        return errorMsg;
    }

}
