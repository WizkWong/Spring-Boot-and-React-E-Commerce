package com.example.SpringBootDemo.user;

import com.example.SpringBootDemo.exception.DuplicateException;
import com.example.SpringBootDemo.exception.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.regex.Pattern;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User getUserById(long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(String.format("User ID:{%d} is not found", id)));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException(String.format("Username {%s} is not found", username)));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new DuplicateException("User is taken");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreated_datetime(LocalDateTime.now());

        userRepository.save(user);

        return user;
    }

    @Transactional
    public void updateUser(User oldUser, User newUser) {
        if (!Objects.equals(oldUser.getUsername(), newUser.getUsername())) {

            if (userRepository.findByUsername(newUser.getUsername()).isPresent()) {
                throw new DuplicateException("User is taken");
            }
            oldUser.setUsername(newUser.getUsername());
        }

        if (!Objects.equals(oldUser.getPassword(), newUser.getPassword())) {
            oldUser.setPassword(newUser.getPassword());
        }

        if (!Objects.equals(oldUser.getEmail(), newUser.getEmail())) {
            oldUser.setEmail(newUser.getEmail());
        }

        if (!Objects.equals(oldUser.getPhoneNo(), newUser.getPhoneNo())) {
            oldUser.setPhoneNo(newUser.getPhoneNo());
        }
    }

    public StringBuilder validateUser(User user) {
        StringBuilder errorMsg = new StringBuilder();

        String username = user.getUsername();
        String password = user.getPassword();
        String email = user.getEmail();
        String phoneNo = user.getPhoneNo();

        Pattern validEmailAddress = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

        if (username == null || username.length() < 4) {
            errorMsg.append("Username cannot be empty or must more than or equal 4 character; ");
        }

        if (password == null || password.length() < 8) {
            errorMsg.append("Password cannot be empty or must at least 8 password length; ");
        }

        if (email == null || !validEmailAddress.matcher(email).matches()) {
            errorMsg.append("Email cannot be empty or is in wrong format; ");
        }

        if (phoneNo == null || phoneNo.length() <= 0) {
            errorMsg.append("Phone number cannot be empty or does not valid; ");
        }

        return errorMsg;
    }

}
