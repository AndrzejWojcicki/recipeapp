package com.usaw.usproject.controller;

import com.usaw.usproject.model.Ingredient;
import com.usaw.usproject.model.Rating;
import com.usaw.usproject.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
public class IngredientController {

    @Autowired
    IngredientRepository ingredientRepository;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("ingredients")
    public ResponseEntity<Ingredient> createIngredient(@Valid  @RequestBody Ingredient ingredient) {

        try {
            Ingredient temp = new Ingredient( ingredient.getProductName(), ingredient.getCalories(),
                    ingredient.getFat(), ingredient.getCarbohydrates(), ingredient.getProteins());
            Ingredient _ingredient = ingredientRepository.save(temp);


            return new ResponseEntity<>(_ingredient, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/ingredients/{id}")
    public ResponseEntity<Ingredient> updateIngredient(@Valid @PathVariable("id") long id, @RequestBody Ingredient ingredient) {

        Optional<Ingredient> ingredientData = ingredientRepository.findById(id);
        if(ingredientData.isPresent()) {
            Ingredient _ingredient = ingredientData.get();
            _ingredient.setProductName(ingredient.getProductName());
            _ingredient.setCalories(ingredient.getCalories());
            _ingredient.setProteins(ingredient.getProteins());
            _ingredient.setFat(ingredient.getFat());
            _ingredient.setCarbohydrates(ingredient.getCarbohydrates());
            return new ResponseEntity<>(ingredientRepository.save(_ingredient), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
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
