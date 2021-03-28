package com.usaw.usproject.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="user_diet")
@Getter
@Setter
@NoArgsConstructor
public class UserDiet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_diet")
    private Long id;

    @Column(name = "amount")
    @NotNull(message = "Amount cannot be null")
    private Float amount;

    @Column(name = "unit")
    @NotNull(message = "Unit cannot be null")
    private String unit;

    @ManyToOne
    @NotNull(message = "Diet cannot be null")
    @JoinColumn(name = "id_user_diet", nullable = false)
    @JsonIgnoreProperties("diets")
    private User user;

    @ManyToOne
    @NotNull(message = "Ingredient cannot be null")
    @JoinColumn(name = "id_product", nullable = false)
    @JsonIgnoreProperties("diets")
    private Ingredient ingredient;

    public UserDiet(User user, Ingredient ingredient, Float amount, String unit) {
        this.user = user;
        this.ingredient = ingredient;
        this.amount = amount;
        this.unit = unit;
    }
}
