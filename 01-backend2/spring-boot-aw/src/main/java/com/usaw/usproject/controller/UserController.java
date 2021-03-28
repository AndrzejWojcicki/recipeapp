package com.usaw.usproject.controller;

import com.usaw.usproject.model.Recipe;
import com.usaw.usproject.model.User;
import com.usaw.usproject.payload.response.MessageResponse;
import com.usaw.usproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;


    @Autowired
    PasswordEncoder encoder;

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@Valid @PathVariable("id") long id, @RequestBody User user) {

        Optional<User> userData = userRepository.findById(id);
        if(userData.isPresent()) {
            User _user = userData.get();
            _user.setFirstName(user.getFirstName());
            _user.setLastName(user.getLastName());
            _user.setPassword(encoder.encode(user.getPassword()));
            _user.setUserName(user.getUserName());
            _user.setCalories(user.getCalories());
            _user.setFat(user.getFat());
            _user.setCarbohydrates(user.getCarbohydrates());
            _user.setProteins(user.getProteins());
            return new ResponseEntity<>(userRepository.save(_user), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
