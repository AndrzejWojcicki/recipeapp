package com.usaw.usproject.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Optional;

public class DietData {

    @JsonIgnoreProperties({ "recipes", "diets" })
    public Optional<Ingredient> ingredient;
    @JsonIgnoreProperties({ "recipe", "ingredient" })
    public Optional<UserDiet> diet;

    public DietData(Optional<Ingredient> ingredient, Optional<UserDiet> diet) {
        this.ingredient = ingredient;
        this.diet = diet;
    }
}
