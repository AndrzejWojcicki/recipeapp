package com.usaw.usproject.controller;

import com.usaw.usproject.model.Recipe;
import com.usaw.usproject.repository.RecipeRepository;
import com.usaw.usproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;


@RestController
public class RecipeController {

    @Autowired
    RecipeRepository recipeRepository;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("recipes")
    public ResponseEntity<Recipe> createRecipe(@RequestBody Recipe recipe) {

       try {

           Recipe temp = new Recipe(recipe.getDifficulty(), recipe.getImageUrl(),
                   recipe.getName(), recipe.getPreparationTime(),
                   recipe.getCategory(), recipe.getAuthor());
           temp.setDateCreated(new Date());
            Recipe _recipe = recipeRepository
                    .save(temp);

            return new ResponseEntity<>(_recipe, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/recipes/{id}")
    public ResponseEntity<Recipe> updateRecipe(@PathVariable("id") long id, @RequestBody Recipe recipe) {

        Optional<Recipe> recipeData = recipeRepository.findById(id);
        if(recipeData.isPresent()) {
            Recipe _recipe = recipeData.get();
            _recipe.setDateCreated(recipe.getDateCreated());
            _recipe.setDateUpdated(new Date());
            _recipe.setDifficulty(recipe.getDifficulty());
            _recipe.setImageUrl(recipe.getImageUrl());
            _recipe.setName(recipe.getName());
            _recipe.setPreparationTime(recipe.getPreparationTime());
            _recipe.setCategory(recipe.getCategory());
            _recipe.setAuthor(recipe.getAuthor());
            return new ResponseEntity<>(recipeRepository.save(_recipe), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/recipes/{id}")
    public ResponseEntity<HttpStatus> deleteRecipe(@PathVariable("id") long id) {
        try {
            recipeRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
