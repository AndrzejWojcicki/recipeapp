package com.usaw.usproject.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Table(name="ingredient")
@Getter
@Setter
@NoArgsConstructor
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    @NotNull(message = "Name cannot be null")
    @Size(min = 2, max = 200, message
            = "About Me must be between 2 and 200 characters")
    private String productName;

    @Column(name = "caloric_value")
    @NotNull(message = "Caloric value cannot be null")
    private Float calories;

    @Column(name = "fats")
    @NotNull(message = "Fats cannot be null")
    private Float fat;

    @Column(name = "carbohydrates")
    @NotNull(message = "Carbohydrates cannot be null")
    private Float carbohydrates;

    @Column(name = "proteins")
    @NotNull(message = "Proteins cannot be null")
    private Float proteins;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "ingredient")
    private Set<RecipeIngredients> recipes ;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "ingredient")
    private Set<UserDiet> diets;

    public Ingredient(String productName, Float calories, Float fat, Float carbohydrates, Float proteins) {
        this.productName = productName;
        this.calories = calories;
        this.fat = fat;
        this.carbohydrates = carbohydrates;
        this.proteins = proteins;
    }
}
