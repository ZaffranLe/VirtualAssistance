package app.service;

import app.domain.ProofType;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing ProofType.
 */
public interface ProofTypeService {

    /**
     * Save a proofType.
     *
     * @param proofType the entity to save
     * @return the persisted entity
     */
    ProofType save(ProofType proofType);

    /**
     * Get all the proofTypes.
     *
     * @return the list of entities
     */
    List<ProofType> findAll();


    /**
     * Get the "id" proofType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ProofType> findOne(Long id);

    /**
     * Delete the "id" proofType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
