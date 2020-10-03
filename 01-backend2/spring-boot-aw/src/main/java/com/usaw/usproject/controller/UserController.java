package com.usaw.usproject.controller;

import com.usaw.usproject.model.Recipe;
import com.usaw.usproject.model.User;
import com.usaw.usproject.payload.response.MessageResponse;
import com.usaw.usproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;


    @Autowired
    PasswordEncoder encoder;

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateRecipe(@PathVariable("id") long id, @RequestBody User user) {

        if (userRepository.existsByUserName(user.getUserName())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Optional<User> userData = userRepository.findById(id);
        if(userData.isPresent()) {
            User _user = userData.get();
            _user.setFirstName(user.getFirstName());
            _user.setLastName(user.getLastName());
            _user.setPassword(encoder.encode(user.getPassword()));
            _user.setUserName(user.getUserName());
            return new ResponseEntity<>(userRepository.save(_user), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
