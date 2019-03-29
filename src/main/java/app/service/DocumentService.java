package app.service;

import app.domain.Document;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Document.
 */
public interface DocumentService {

    /**
     * Save a document.
     *
     * @param document the entity to save
     * @return the persisted entity
     */
    Document save(Document document);

    /**
     * Get all the documents.
     *
     * @return the list of entities
     */
    List<Document> findAll();

    /**
     * Get all the Document with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<Document> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" document.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Document> findOne(Long id);

    /**
     * Delete the "id" document.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
    
    List<Document> findByCurrentAccount();
}
