package app.service;

import app.domain.Proofs;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Proofs.
 */
public interface ProofsService {

    /**
     * Save a proofs.
     *
     * @param proofs the entity to save
     * @return the persisted entity
     */
    Proofs save(Proofs proofs);

    /**
     * Get all the proofs.
     *
     * @return the list of entities
     */
    List<Proofs> findAll();
    List<Proofs> findByAns(Long idans);

    /**
     * Get all the Proofs with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<Proofs> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" proofs.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Proofs> findOne(Long id);

    /**
     * Delete the "id" proofs.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
