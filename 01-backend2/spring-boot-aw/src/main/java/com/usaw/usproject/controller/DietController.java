package com.usaw.usproject.controller;

import com.usaw.usproject.model.RecipeIngredients;
import com.usaw.usproject.model.UserDiet;
import com.usaw.usproject.repository.CommentRepository;
import com.usaw.usproject.repository.DietRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
public class DietController {

    @Autowired
    DietRepository dietRepository;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("diet")
    public ResponseEntity<UserDiet> createDiet(@Valid @RequestBody UserDiet diet) {

        try {
            UserDiet temp = new UserDiet( diet.getUser(), diet.getIngredient(), diet.getAmount(), diet.getUnit());
            UserDiet _diet = dietRepository.save(temp);

            return new ResponseEntity<>(_diet, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/diet/{id}")
    public ResponseEntity<UserDiet> updateDiet(@Valid @PathVariable("id") long id, @RequestBody UserDiet diet) {

        Optional<UserDiet> dietData = dietRepository.findById(id);
        if(dietData.isPresent()) {
            UserDiet _diet = dietData.get();
            _diet.setUser(diet.getUser());
            _diet.setIngredient(diet.getIngredient());
            _diet.setAmount(diet.getAmount());
            _diet.setUnit(diet.getUnit());
            return new ResponseEntity<>(dietRepository.save(_diet), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/diet/{id}")
    public ResponseEntity<HttpStatus> deleteIngredient(@PathVariable("id") long id) {
        try {
            dietRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
