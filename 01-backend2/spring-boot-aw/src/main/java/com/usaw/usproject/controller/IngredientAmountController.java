package com.usaw.usproject.controller;

import com.usaw.usproject.model.Ingredient;
import com.usaw.usproject.model.RecipeIngredients;
import com.usaw.usproject.repository.IngredientRepository;
import com.usaw.usproject.repository.RecipeIngredientsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class IngredientAmountController {

    @Autowired
    RecipeIngredientsRepository amountIngredientRepository;

    @PostMapping("amountsOfIngredients")
    public ResponseEntity<RecipeIngredients> createIngredient(@RequestBody RecipeIngredients amount) {

        try {
            RecipeIngredients temp = new RecipeIngredients( amount.getRecipe(), amount.getIngredient(), amount.getAmount());
            RecipeIngredients _ingredient = amountIngredientRepository.save(temp);

            return new ResponseEntity<>(_ingredient, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/amountsOfIngredients/{id}")
    public ResponseEntity<RecipeIngredients> updateIngredient(@PathVariable("id") long id, @RequestBody RecipeIngredients amount) {

        Optional<RecipeIngredients> amountData = amountIngredientRepository.findById(id);
        if(amountData.isPresent()) {
            RecipeIngredients _amount = amountData.get();
            _amount.setRecipe(amount.getRecipe());
            _amount.setIngredient(amount.getIngredient());
            _amount.setAmount(amount.getAmount());
            return new ResponseEntity<>(amountIngredientRepository.save(_amount), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/amountsOfIngredients/{id}")
    public ResponseEntity<HttpStatus> deleteIngredient(@PathVariable("id") long id) {
        try {
            amountIngredientRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}