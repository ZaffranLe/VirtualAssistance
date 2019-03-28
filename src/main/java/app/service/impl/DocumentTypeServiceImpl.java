package app.service.impl;

import app.service.DocumentTypeService;
import app.domain.DocumentType;
import app.repository.DocumentTypeRepository;
import app.security.AuthoritiesConstants;
import app.security.SecurityUtils;
import app.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing DocumentType.
 */
@Service
@Transactional
public class DocumentTypeServiceImpl implements DocumentTypeService {

    private final Logger log = LoggerFactory.getLogger(DocumentTypeServiceImpl.class);

    private final DocumentTypeRepository documentTypeRepository;

    public DocumentTypeServiceImpl(DocumentTypeRepository documentTypeRepository) {
        this.documentTypeRepository = documentTypeRepository;
    }

    /**
     * Save a documentType.
     *
     * @param documentType the entity to save
     * @return the persisted entity
     */
    @Override
    public DocumentType save(DocumentType documentType) {
        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            log.debug("Request to save DocumentType : {}", documentType);
            return documentTypeRepository.save(documentType);
        } else {
            throw new BadRequestAlertException("Dont have authorize", null, null);
        }
    }

    /**
     * Get all the documentTypes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<DocumentType> findAll() {
        log.debug("Request to get all DocumentTypes");
        return documentTypeRepository.findAll();
    }

    /**
     * Get one documentType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DocumentType> findOne(Long id) {
        log.debug("Request to get DocumentType : {}", id);
        return documentTypeRepository.findById(id);
    }

    /**
     * Delete the documentType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            log.debug("Request to delete DocumentType : {}", id);
            documentTypeRepository.deleteById(id);
        } else {
            throw new BadRequestAlertException("Dont have authorize", null, null);
        }
    }
}
