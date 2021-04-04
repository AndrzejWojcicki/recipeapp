package com.usaw.usproject.controller;

import com.usaw.usproject.model.Recipe;
import com.usaw.usproject.model.ShoppingList;
import com.usaw.usproject.repository.RecipeRepository;
import com.usaw.usproject.repository.ShoppingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.Optional;

@RestController
public class ShoppingListController {

    @Autowired
    ShoppingListRepository shoppingListRepository;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("shoppingList")
    public ResponseEntity<ShoppingList> createShoppinglist(@Valid @RequestBody ShoppingList shoppingList) {

        try {

            ShoppingList temp = new ShoppingList(shoppingList.getAuthor(), shoppingList.getProductName(),
                    shoppingList.getQuantity(), shoppingList.getAdditionalNote(), shoppingList.isBought());
            ShoppingList _shoppingList = shoppingListRepository.save(temp);
            return new ResponseEntity<>(_shoppingList, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/shoppingList/{id}")
    public ResponseEntity<ShoppingList> updateShoppingList(@Valid  @PathVariable("id") long id, @RequestBody ShoppingList shoppingList) {

        Optional<ShoppingList> shoppingListData = shoppingListRepository.findById(id);
        if(shoppingListData.isPresent()) {
            ShoppingList _shoppingList = shoppingListData.get();
            _shoppingList.setAuthor(shoppingList.getAuthor());
            _shoppingList.setProductName(shoppingList.getProductName());
            _shoppingList.setQuantity(shoppingList.getQuantity());
            _shoppingList.setAdditionalNote(shoppingList.getAdditionalNote());
            _shoppingList.setBought(shoppingList.isBought());
            return new ResponseEntity<>(shoppingListRepository.save(_shoppingList), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/shoppingList/{id}")
    public ResponseEntity<HttpStatus> deleteShoppingList(@PathVariable("id") long id) {
        try {
            shoppingListRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
