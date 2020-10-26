package com.usaw.usproject.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name="comment")
@Getter
@Setter
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long comment_id;

    public Comment(User author, Recipe recipe,
                   String message) {
        this.author = author;
        this.recipe = recipe;
        this.message = message;
    }

    @ManyToOne
    @NotNull(message = "Name cannot be null")
    @JoinColumn(name = "recipe_id", nullable = false)
    @JsonIgnoreProperties("comments")
    private Recipe recipe;

    @ManyToOne
    @NotNull(message = "Author cannot be null")
    @JoinColumn(name = "author_id", nullable = false)
    @JsonIgnoreProperties("comments")
    private User author;

    @Column(name = "message")
    private String message;

    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;


}
