package app.service.impl;

import app.service.TeacherDocumentService;
import app.domain.TeacherDocument;
import app.repository.TeacherDocumentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing TeacherDocument.
 */
@Service
@Transactional
public class TeacherDocumentServiceImpl implements TeacherDocumentService {

    private final Logger log = LoggerFactory.getLogger(TeacherDocumentServiceImpl.class);

    private final TeacherDocumentRepository teacherDocumentRepository;

    public TeacherDocumentServiceImpl(TeacherDocumentRepository teacherDocumentRepository) {
        this.teacherDocumentRepository = teacherDocumentRepository;
    }

    /**
     * Save a teacherDocument.
     *
     * @param teacherDocument the entity to save
     * @return the persisted entity
     */
    @Override
    public TeacherDocument save(TeacherDocument teacherDocument) {
        log.debug("Request to save TeacherDocument : {}", teacherDocument);        return teacherDocumentRepository.save(teacherDocument);
    }

    /**
     * Get all the teacherDocuments.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<TeacherDocument> findAll() {
        log.debug("Request to get all TeacherDocuments");
        return teacherDocumentRepository.findAll();
    }


    /**
     * Get one teacherDocument by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<TeacherDocument> findOne(Long id) {
        log.debug("Request to get TeacherDocument : {}", id);
        return teacherDocumentRepository.findById(id);
    }

    /**
     * Delete the teacherDocument by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete TeacherDocument : {}", id);
        teacherDocumentRepository.deleteById(id);
    }
}
