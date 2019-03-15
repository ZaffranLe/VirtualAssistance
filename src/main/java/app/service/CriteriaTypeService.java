package app.service;

import app.domain.CriteriaType;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing CriteriaType.
 */
public interface CriteriaTypeService {

    /**
     * Save a criteriaType.
     *
     * @param criteriaType the entity to save
     * @return the persisted entity
     */
    CriteriaType save(CriteriaType criteriaType);

    /**
     * Get all the criteriaTypes.
     *
     * @return the list of entities
     */
    List<CriteriaType> findAll();


    /**
     * Get the "id" criteriaType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CriteriaType> findOne(Long id);

    /**
     * Delete the "id" criteriaType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
