package com.usaw.usproject.controller;

import com.usaw.usproject.model.Recipe;
import com.usaw.usproject.model.RecipeSteps;
import com.usaw.usproject.repository.RecipeStepsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.Optional;


@RestController
public class StepsController {

    @Autowired
    RecipeStepsRepository stepsRepository;


    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("steps")
    public ResponseEntity<RecipeSteps> createStep(@Valid @RequestBody RecipeSteps steps) {
        try {
            RecipeSteps temp = new RecipeSteps(steps.getDescription(), steps.getRecipe(), steps.getStepNumber());
            RecipeSteps _steps = stepsRepository
                    .save(temp);

            return new ResponseEntity<>(_steps, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/steps/{id}")
    public ResponseEntity<RecipeSteps> updateStep(@Valid @PathVariable("id") long id, @RequestBody RecipeSteps step) {

        Optional<RecipeSteps> stepData = stepsRepository.findById(id);
        if(stepData.isPresent()) {
            RecipeSteps _step = stepData.get();
            _step.setDescription(step.getDescription());
            _step.setRecipe(step.getRecipe());
            _step.setStepNumber(step.getStepNumber());
            return new ResponseEntity<>(stepsRepository.save(_step), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/steps/{id}")
    public ResponseEntity<HttpStatus> deleteStep(@PathVariable("id") long id) {
        try {
            stepsRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
