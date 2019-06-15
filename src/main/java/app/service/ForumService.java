package app.service;

import app.domain.Forum;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Forum.
 */
public interface ForumService {

    /**
     * Save a forum.
     *
     * @param forum the entity to save
     * @return the persisted entity
     */
    Forum save(Forum forum);

    /**
     * Get all the forums.
     *
     * @return the list of entities
     */
    List<Forum> findAll();

    List<Forum> findNew();

    /**
     * Get the "id" forum.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Forum> findOne(Long id);

    /**
     * Delete the "id" forum.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
