package com.usaw.usproject.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="rating")
@Getter
@Setter
@NoArgsConstructor
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rating_id")
    private Long rating_id;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    @JsonIgnoreProperties("ratings")
    @NotNull(message = "Name cannot be null")
    private Recipe recipe;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties("ratings")
    @NotNull(message = "Author cannot be null")
    private User user;

    @Column(name = "value")
    @Min(value = 1, message = "value should not be less than 1")
    @Max(value = 5, message = "value should not be greater than 5")
    private int value;

    public Rating(Recipe recipe, User user, int value) {
        this.recipe = recipe;
        this.user = user;
        this.value = value;
    }
}
