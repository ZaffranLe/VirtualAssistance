package app.service.impl;

import app.service.ProofTypeService;
import app.domain.ProofType;
import app.repository.ProofTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing ProofType.
 */
@Service
@Transactional
public class ProofTypeServiceImpl implements ProofTypeService {

    private final Logger log = LoggerFactory.getLogger(ProofTypeServiceImpl.class);

    private final ProofTypeRepository proofTypeRepository;

    public ProofTypeServiceImpl(ProofTypeRepository proofTypeRepository) {
        this.proofTypeRepository = proofTypeRepository;
    }

    /**
     * Save a proofType.
     *
     * @param proofType the entity to save
     * @return the persisted entity
     */
    @Override
    public ProofType save(ProofType proofType) {
        log.debug("Request to save ProofType : {}", proofType);        return proofTypeRepository.save(proofType);
    }

    /**
     * Get all the proofTypes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProofType> findAll() {
        log.debug("Request to get all ProofTypes");
        return proofTypeRepository.findAll();
    }


    /**
     * Get one proofType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ProofType> findOne(Long id) {
        log.debug("Request to get ProofType : {}", id);
        return proofTypeRepository.findById(id);
    }

    /**
     * Delete the proofType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProofType : {}", id);
        proofTypeRepository.deleteById(id);
    }
}
