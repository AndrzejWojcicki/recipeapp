package com.usaw.usproject.controller;

import com.usaw.usproject.model.Comment;
import com.usaw.usproject.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

@RestController
public class CommentController {
    @Autowired
    CommentRepository commentRepository;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("comments")
    public ResponseEntity<Comment> createComment(@Valid @RequestBody Comment comment) {
        System.out.println(comment);
        try {
            Comment temp = new Comment( comment.getAuthor(), comment.getRecipe(),
                    comment.getMessage() );
            temp.setDateCreated(new Date());
            Comment _comment = commentRepository.save(temp);

            return new ResponseEntity<>(_comment, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/comments/{id}")
    public ResponseEntity<HttpStatus> deleteComment(@PathVariable("id") long id) {
        try {
            commentRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
