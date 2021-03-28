package com.usaw.usproject.repository;

import com.usaw.usproject.model.ShoppingList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "shoppingList", path = "shoppingList")
public interface ShoppingListRepository extends JpaRepository<ShoppingList, Long> {
}
