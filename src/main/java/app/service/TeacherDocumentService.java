package app.service;

import app.domain.TeacherDocument;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing TeacherDocument.
 */
public interface TeacherDocumentService {

    /**
     * Save a teacherDocument.
     *
     * @param teacherDocument the entity to save
     * @return the persisted entity
     */
    TeacherDocument save(TeacherDocument teacherDocument);

    /**
     * Get all the teacherDocuments.
     *
     * @return the list of entities
     */
    List<TeacherDocument> findAll();


    /**
     * Get the "id" teacherDocument.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<TeacherDocument> findOne(Long id);

    /**
     * Delete the "id" teacherDocument.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
