package app.service.impl;

import app.service.ProofsService;
import app.domain.Proofs;
import app.repository.ProofsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Proofs.
 */
@Service
@Transactional
public class ProofsServiceImpl implements ProofsService {

    private final Logger log = LoggerFactory.getLogger(ProofsServiceImpl.class);

    private final ProofsRepository proofsRepository;

    public ProofsServiceImpl(ProofsRepository proofsRepository) {
        this.proofsRepository = proofsRepository;
    }

    /**
     * Save a proofs.
     *
     * @param proofs the entity to save
     * @return the persisted entity
     */
    @Override
    public Proofs save(Proofs proofs) {
        log.debug("Request to save Proofs : {}", proofs);        return proofsRepository.save(proofs);
    }

    /**
     * Get all the proofs.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Proofs> findAll() {
        log.debug("Request to get all Proofs");
        return proofsRepository.findAllWithEagerRelationships();
    }
    @Override
    @Transactional(readOnly = true)
    public List<Proofs> findByAns(Long idans) {
        log.debug("Request to get all Proofs");
        return proofsRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the Proofs with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<Proofs> findAllWithEagerRelationships(Pageable pageable) {
        return proofsRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one proofs by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Proofs> findOne(Long id) {
        log.debug("Request to get Proofs : {}", id);
        return proofsRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the proofs by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Proofs : {}", id);
        proofsRepository.deleteById(id);
    }
}
