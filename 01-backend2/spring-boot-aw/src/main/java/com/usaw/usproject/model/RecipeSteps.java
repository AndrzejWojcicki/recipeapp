package com.usaw.usproject.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="recipe_steps")
@Getter
@Setter
@NoArgsConstructor
public class RecipeSteps {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "step_id")
    private Long id;

    @Column(name = "description")
    @NotNull(message = "Description cannot be null")
    private String description;

    @Column(name = "step_number")
    @NotNull(message = "Step Number cannot be null")
    private int stepNumber;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    @JsonIgnoreProperties("steps")
    private Recipe recipe;

    public RecipeSteps(String description, Recipe recipe, int stepNumber) {
        this.description = description;
        this.recipe = recipe;
        this.stepNumber = stepNumber;
    }
}
