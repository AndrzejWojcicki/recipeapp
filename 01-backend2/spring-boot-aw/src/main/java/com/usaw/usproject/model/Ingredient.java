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

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "ingredient")
    private Set<RecipeIngredients> recipes ;

    public Ingredient(String productName) {
        this.productName = productName;
    }
}
