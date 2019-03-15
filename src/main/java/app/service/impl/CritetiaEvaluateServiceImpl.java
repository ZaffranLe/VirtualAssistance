package app.service.impl;

import app.service.CritetiaEvaluateService;
import app.domain.CritetiaEvaluate;
import app.repository.CritetiaEvaluateRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing CritetiaEvaluate.
 */
@Service
@Transactional
public class CritetiaEvaluateServiceImpl implements CritetiaEvaluateService {

    private final Logger log = LoggerFactory.getLogger(CritetiaEvaluateServiceImpl.class);

    private final CritetiaEvaluateRepository critetiaEvaluateRepository;

    public CritetiaEvaluateServiceImpl(CritetiaEvaluateRepository critetiaEvaluateRepository) {
        this.critetiaEvaluateRepository = critetiaEvaluateRepository;
    }

    /**
     * Save a critetiaEvaluate.
     *
     * @param critetiaEvaluate the entity to save
     * @return the persisted entity
     */
    @Override
    public CritetiaEvaluate save(CritetiaEvaluate critetiaEvaluate) {
        log.debug("Request to save CritetiaEvaluate : {}", critetiaEvaluate);        return critetiaEvaluateRepository.save(critetiaEvaluate);
    }

    /**
     * Get all the critetiaEvaluates.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CritetiaEvaluate> findAll() {
        log.debug("Request to get all CritetiaEvaluates");
        return critetiaEvaluateRepository.findAll();
    }


    /**
     * Get one critetiaEvaluate by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CritetiaEvaluate> findOne(Long id) {
        log.debug("Request to get CritetiaEvaluate : {}", id);
        return critetiaEvaluateRepository.findById(id);
    }

    /**
     * Delete the critetiaEvaluate by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CritetiaEvaluate : {}", id);
        critetiaEvaluateRepository.deleteById(id);
    }
}
