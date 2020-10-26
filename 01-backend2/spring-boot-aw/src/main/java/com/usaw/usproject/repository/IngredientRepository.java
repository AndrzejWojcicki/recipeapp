package com.usaw.usproject.repository;


import com.usaw.usproject.model.Ingredient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;



public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    @RestResource(path = "search")
    Page<Ingredient> findByProductNameContaining(@Param("name") String keyword, Pageable pageable);
}
