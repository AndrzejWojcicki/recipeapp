package com.usaw.usproject.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Optional;

public class RecipeIngredientData {

    @JsonIgnoreProperties({ "recipes", "diets" })
    public Optional<Ingredient> ingredient;
    @JsonIgnoreProperties({ "recipe", "ingredient" })
    public Optional<RecipeIngredients> amount;

    public RecipeIngredientData(Optional<Ingredient> ingredient, Optional<RecipeIngredients> amount) {
        this.ingredient = ingredient;
        this.amount = amount;
    }
}
