package com.usaw.usproject.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="recipe_ingredients")
@Getter
@Setter
@NoArgsConstructor
public class RecipeIngredients {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    @JsonIgnoreProperties("ingredients")
    private Recipe recipe;

    @ManyToOne
    @JoinColumn(name = "ingredient_id", nullable = false)
    @JsonIgnoreProperties("ingredients")
    private Ingredient ingredient;

    @Column(name = "amount")
    @NotNull(message = "Amount cannot be null")
    private Double amount;

    @Column(name = "unit")
    @NotNull(message = "Unit cannot be null")
    private String unit;

    public RecipeIngredients(Recipe recipe, Ingredient ingredient, Double amount) {
        this.recipe = recipe;
        this.ingredient = ingredient;
        this.amount = amount;
    }
}
