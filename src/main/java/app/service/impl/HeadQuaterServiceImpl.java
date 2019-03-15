package app.service.impl;

import app.service.HeadQuaterService;
import app.domain.HeadQuater;
import app.repository.HeadQuaterRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing HeadQuater.
 */
@Service
@Transactional
public class HeadQuaterServiceImpl implements HeadQuaterService {

    private final Logger log = LoggerFactory.getLogger(HeadQuaterServiceImpl.class);

    private final HeadQuaterRepository headQuaterRepository;

    public HeadQuaterServiceImpl(HeadQuaterRepository headQuaterRepository) {
        this.headQuaterRepository = headQuaterRepository;
    }

    /**
     * Save a headQuater.
     *
     * @param headQuater the entity to save
     * @return the persisted entity
     */
    @Override
    public HeadQuater save(HeadQuater headQuater) {
        log.debug("Request to save HeadQuater : {}", headQuater);        return headQuaterRepository.save(headQuater);
    }

    /**
     * Get all the headQuaters.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<HeadQuater> findAll() {
        log.debug("Request to get all HeadQuaters");
        return headQuaterRepository.findAll();
    }


    /**
     * Get one headQuater by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<HeadQuater> findOne(Long id) {
        log.debug("Request to get HeadQuater : {}", id);
        return headQuaterRepository.findById(id);
    }

    /**
     * Delete the headQuater by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete HeadQuater : {}", id);
        headQuaterRepository.deleteById(id);
    }
}
