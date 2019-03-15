package app.service;

import app.domain.CritetiaEvaluate;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing CritetiaEvaluate.
 */
public interface CritetiaEvaluateService {

    /**
     * Save a critetiaEvaluate.
     *
     * @param critetiaEvaluate the entity to save
     * @return the persisted entity
     */
    CritetiaEvaluate save(CritetiaEvaluate critetiaEvaluate);

    /**
     * Get all the critetiaEvaluates.
     *
     * @return the list of entities
     */
    List<CritetiaEvaluate> findAll();


    /**
     * Get the "id" critetiaEvaluate.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CritetiaEvaluate> findOne(Long id);

    /**
     * Delete the "id" critetiaEvaluate.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
