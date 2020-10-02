package com.usaw.usproject.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
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
    private String productName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "ingredient")
    private Set<RecipeIngredients> recipes ;

    public Ingredient(String productName) {
        this.productName = productName;
    }
}
