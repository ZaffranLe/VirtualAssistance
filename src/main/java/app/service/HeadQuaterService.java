package app.service;

import app.domain.HeadQuater;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing HeadQuater.
 */
public interface HeadQuaterService {

    /**
     * Save a headQuater.
     *
     * @param headQuater the entity to save
     * @return the persisted entity
     */
    HeadQuater save(HeadQuater headQuater);

    /**
     * Get all the headQuaters.
     *
     * @return the list of entities
     */
    List<HeadQuater> findAll();


    /**
     * Get the "id" headQuater.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<HeadQuater> findOne(Long id);

    /**
     * Delete the "id" headQuater.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
