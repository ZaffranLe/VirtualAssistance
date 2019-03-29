package app.service.impl;

import app.service.CriteriaEvaluateService;
import app.domain.CriteriaEvaluate;
import app.repository.CriteriaEvaluateRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing CriteriaEvaluate.
 */
@Service
@Transactional
public class CriteriaEvaluateServiceImpl implements CriteriaEvaluateService {

    private final Logger log = LoggerFactory.getLogger(CriteriaEvaluateServiceImpl.class);

    private final CriteriaEvaluateRepository criteriaEvaluateRepository;

    public CriteriaEvaluateServiceImpl(CriteriaEvaluateRepository criteriaEvaluateRepository) {
        this.criteriaEvaluateRepository = criteriaEvaluateRepository;
    }

    /**
     * Save a criteriaEvaluate.
     *
     * @param criteriaEvaluate the entity to save
     * @return the persisted entity
     */
    @Override
    public CriteriaEvaluate save(CriteriaEvaluate criteriaEvaluate) {
        log.debug("Request to save CriteriaEvaluate : {}", criteriaEvaluate);
        return criteriaEvaluateRepository.save(criteriaEvaluate);
    }

    /**
     * Get all the criteriaEvaluates.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CriteriaEvaluate> findAll() {
        log.debug("Request to get all CriteriaEvaluates");
        return criteriaEvaluateRepository.findAll();
    }


    /**
     * Get one criteriaEvaluate by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CriteriaEvaluate> findOne(Long id) {
        log.debug("Request to get CriteriaEvaluate : {}", id);
        return criteriaEvaluateRepository.findById(id);
    }

    /**
     * Delete the criteriaEvaluate by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CriteriaEvaluate : {}", id);
        criteriaEvaluateRepository.deleteById(id);
    }
}
