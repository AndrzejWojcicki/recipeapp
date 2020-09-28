package com.usaw.usproject.repository;

import com.usaw.usproject.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "ratingsOfRecipe", path = "recipe-ratings")
public interface RatingRepository extends JpaRepository<Rating, Long> {
}
