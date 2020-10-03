package com.usaw.usproject.repository;

import com.usaw.usproject.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "commentsOfRecipe", path = "recipe-comments")
public interface CommentRepository extends JpaRepository<Comment, Long> {
}
