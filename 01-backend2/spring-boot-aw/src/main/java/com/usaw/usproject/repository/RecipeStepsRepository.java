package com.usaw.usproject.repository;

import com.usaw.usproject.model.RecipeSteps;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "stepsOfRecipe", path = "recipe-steps")
public interface RecipeStepsRepository extends JpaRepository<RecipeSteps, Long> {
}
