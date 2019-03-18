package app.service;

import app.domain.CriteriaEvaluate;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing CriteriaEvaluate.
 */
public interface CriteriaEvaluateService {

    /**
     * Save a criteriaEvaluate.
     *
     * @param criteriaEvaluate the entity to save
     * @return the persisted entity
     */
    CriteriaEvaluate save(CriteriaEvaluate criteriaEvaluate);

    /**
     * Get all the criteriaEvaluates.
     *
     * @return the list of entities
     */
    List<CriteriaEvaluate> findAll();


    /**
     * Get the "id" criteriaEvaluate.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CriteriaEvaluate> findOne(Long id);

    /**
     * Delete the "id" criteriaEvaluate.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
