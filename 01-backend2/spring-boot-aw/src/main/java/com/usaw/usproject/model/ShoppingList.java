package com.usaw.usproject.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="shopping_list")
@Getter
@Setter
@NoArgsConstructor
public class ShoppingList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    public ShoppingList(User author, String productName,
                   long quantity, String additionalNote,
                        boolean bought) {
        this.author = author;
        this.productName = productName;
        this.quantity = quantity;
        this.additionalNote = additionalNote;
        this.bought = bought;
    }

    @Column(name = "product_name")
    @NotNull(message = "Product name cannot be null")
    private String productName;

    @Column(name = "quantity")
    @NotNull(message = "quantity cannot be null")
    private long quantity;

    @Column(name = "additional_note")
    private String additionalNote;

    @Column(name = "bought")
    private boolean bought;

    @ManyToOne
    @NotNull(message = "Author cannot be null")
    @JoinColumn(name = "author_of_list_id", nullable = false)
    @JsonIgnoreProperties("shoppingLists")
    private User author;
}
