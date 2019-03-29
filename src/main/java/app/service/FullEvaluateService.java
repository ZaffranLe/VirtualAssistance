package app.service;

import app.domain.FullEvaluate;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing FullEvaluate.
 */
public interface FullEvaluateService {

    /**
     * Save a fullEvaluate.
     *
     * @param fullEvaluate the entity to save
     * @return the persisted entity
     */
    FullEvaluate save(FullEvaluate fullEvaluate);

    /**
     * Get all the fullEvaluates.
     *
     * @return the list of entities
     */
    List<FullEvaluate> findAll();

    /**
     * Get the "id" fullEvaluate.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<FullEvaluate> findOne(Long id);

    /**
     * Delete the "id" fullEvaluate.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    FullEvaluate create(String result, String[] questionresult);
    
    

}
