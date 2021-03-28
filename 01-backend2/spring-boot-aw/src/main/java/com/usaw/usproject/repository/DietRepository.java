package com.usaw.usproject.repository;

import com.usaw.usproject.model.ShoppingList;
import com.usaw.usproject.model.UserDiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "userDiet", path = "diet")
public interface DietRepository extends JpaRepository<UserDiet, Long> {
}
