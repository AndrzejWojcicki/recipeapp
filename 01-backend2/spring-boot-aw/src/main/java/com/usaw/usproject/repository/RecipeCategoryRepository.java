package com.usaw.usproject.repository;

import com.usaw.usproject.model.RecipeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "recipeCategory", path = "recipe-Category")
public interface RecipeCategoryRepository extends JpaRepository<RecipeCategory, Long> {
}
