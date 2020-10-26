package com.usaw.usproject.controller;

import com.usaw.usproject.model.Comment;
import com.usaw.usproject.model.Rating;
import com.usaw.usproject.model.Recipe;
import com.usaw.usproject.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
public class RatingController {

    @Autowired
    RatingRepository ratingRepository;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("ratings")
    public ResponseEntity<Rating> createRating(@Valid @RequestBody Rating rate) {

        try {
            Rating temp = new Rating( rate.getRecipe(), rate.getUser(), rate.getValue());
            Rating _rate = ratingRepository.save(temp);

            return new ResponseEntity<>(_rate, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/ratings/{id}")
    public ResponseEntity<Rating> updateRating(@Valid @PathVariable("id") long id, @RequestBody Rating rating) {

        Optional<Rating> rateData = ratingRepository.findById(id);
        if(rateData.isPresent()) {
            Rating _rating = rateData.get();
            _rating.setRecipe(rating.getRecipe());
            _rating.setUser(rating.getUser());
            _rating.setValue(rating.getValue());
            return new ResponseEntity<>(ratingRepository.save(_rating), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/ratings/{id}")
    public ResponseEntity<HttpStatus> deleteRating(@PathVariable("id") long id) {
        try {
            ratingRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
