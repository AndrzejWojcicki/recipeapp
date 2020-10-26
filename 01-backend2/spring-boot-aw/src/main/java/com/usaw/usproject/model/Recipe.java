package com.usaw.usproject.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name="recipe")
@NoArgsConstructor
@Getter
@Setter
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    public Recipe(
                  int difficulty, String imageUrl,
                  String name, int preparationTime,
                  RecipeCategory category, User author
                    ) {
        this.difficulty = difficulty;
        this.imageUrl = imageUrl;
        this.name = name;
        this.preparationTime = preparationTime;
        this.category = category;
        this.author = author;
    }

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    @JsonIgnoreProperties("recipes")
    @NotNull(message = "Category cannot be null")
    private RecipeCategory category;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    @JsonIgnoreProperties("recipes")
    @NotNull(message = "Author cannot be null")
    private User author;


    @OneToMany(cascade = CascadeType.ALL, mappedBy = "recipe")
    private Set<RecipeSteps> steps;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "recipe")
    private Set<Comment> comments ;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "recipe")
    private Set<Rating> ratings ;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "recipe")
    private Set<RecipeIngredients> ingredients ;

    @Column(name = "name")
    @NotNull(message = "Name cannot be null")
    private String name;

    @Column(name = "difficulty")
    @NotNull(message = "Difficulty cannot be null")
    private int difficulty;

    @Column(name = "preparation_time")
    @NotNull(message = "Preparation Time cannot be null")
    private int preparationTime;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "date_updated")
    private Date dateUpdated;


}
