package com.usaw.usproject.repository;

import com.usaw.usproject.model.RecipeIngredients;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "RecipeIngredients", path = "recipe-ingredients")
public interface RecipeIngredientsRepository extends JpaRepository<RecipeIngredients, Long> {

}
