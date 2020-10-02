package com.usaw.usproject.controller;

import com.usaw.usproject.model.Ingredient;
import com.usaw.usproject.model.Rating;
import com.usaw.usproject.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class IngredientController {

    @Autowired
    IngredientRepository ingredientRepository;

    @PostMapping("ingredients")
    public ResponseEntity<Ingredient> createIngredient(@RequestBody Ingredient ingredient) {

        try {
            Ingredient temp = new Ingredient( ingredient.getProductName());
            Ingredient _ingredient = ingredientRepository.save(temp);

            return new ResponseEntity<>(_ingredient, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/ingredients/{id}")
    public ResponseEntity<Ingredient> updateIngredient(@PathVariable("id") long id, @RequestBody Ingredient ingredient) {

        Optional<Ingredient> ingredientData = ingredientRepository.findById(id);
        if(ingredientData.isPresent()) {
            Ingredient _ingredient = ingredientData.get();
            _ingredient.setProductName(ingredient.getProductName());
            return new ResponseEntity<>(ingredientRepository.save(_ingredient), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/ingredients/{id}")
    public ResponseEntity<HttpStatus> deleteIngredient(@PathVariable("id") long id) {
        try {
            ingredientRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
