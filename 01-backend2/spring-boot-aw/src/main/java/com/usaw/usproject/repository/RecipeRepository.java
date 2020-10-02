package com.usaw.usproject.repository;


import com.usaw.usproject.model.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;


public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    @RestResource(path = "category")
    Page<Recipe> findByCategoryId(@Param("id") Long id, Pageable pageable);

    @RestResource(path = "search")
    Page<Recipe> findByNameContaining(@Param("name") String keyword, Pageable pageable);

}
