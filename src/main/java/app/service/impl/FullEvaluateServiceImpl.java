package app.service.impl;

import app.service.FullEvaluateService;
import app.domain.FullEvaluate;
import app.repository.FullEvaluateRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing FullEvaluate.
 */
@Service
@Transactional
public class FullEvaluateServiceImpl implements FullEvaluateService {

    private final Logger log = LoggerFactory.getLogger(FullEvaluateServiceImpl.class);

    private final FullEvaluateRepository fullEvaluateRepository;

    public FullEvaluateServiceImpl(FullEvaluateRepository fullEvaluateRepository) {
        this.fullEvaluateRepository = fullEvaluateRepository;
    }

    /**
     * Save a fullEvaluate.
     *
     * @param fullEvaluate the entity to save
     * @return the persisted entity
     */
    @Override
    public FullEvaluate save(FullEvaluate fullEvaluate) {
        
        log.debug("Request to save FullEvaluate : {}", fullEvaluate); 
        return fullEvaluateRepository.save(fullEvaluate);
    }

    /**
     * Get all the fullEvaluates.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FullEvaluate> findAll() {
        log.debug("Request to get all FullEvaluates");
        return fullEvaluateRepository.findAll();
    }


    /**
     * Get one fullEvaluate by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<FullEvaluate> findOne(Long id) {
        log.debug("Request to get FullEvaluate : {}", id);
        return fullEvaluateRepository.findById(id);
    }

    /**
     * Delete the fullEvaluate by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FullEvaluate : {}", id);
        fullEvaluateRepository.deleteById(id);
    }
}
