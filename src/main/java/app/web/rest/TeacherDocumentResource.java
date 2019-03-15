package app.web.rest;

import com.codahale.metrics.annotation.Timed;
import app.domain.TeacherDocument;
import app.service.TeacherDocumentService;
import app.web.rest.errors.BadRequestAlertException;
import app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TeacherDocument.
 */
@RestController
@RequestMapping("/api")
public class TeacherDocumentResource {

    private final Logger log = LoggerFactory.getLogger(TeacherDocumentResource.class);

    private static final String ENTITY_NAME = "teacherDocument";

    private final TeacherDocumentService teacherDocumentService;

    public TeacherDocumentResource(TeacherDocumentService teacherDocumentService) {
        this.teacherDocumentService = teacherDocumentService;
    }

    /**
     * POST  /teacher-documents : Create a new teacherDocument.
     *
     * @param teacherDocument the teacherDocument to create
     * @return the ResponseEntity with status 201 (Created) and with body the new teacherDocument, or with status 400 (Bad Request) if the teacherDocument has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/teacher-documents")
    @Timed
    public ResponseEntity<TeacherDocument> createTeacherDocument(@RequestBody TeacherDocument teacherDocument) throws URISyntaxException {
        log.debug("REST request to save TeacherDocument : {}", teacherDocument);
        if (teacherDocument.getId() != null) {
            throw new BadRequestAlertException("A new teacherDocument cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TeacherDocument result = teacherDocumentService.save(teacherDocument);
        return ResponseEntity.created(new URI("/api/teacher-documents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /teacher-documents : Updates an existing teacherDocument.
     *
     * @param teacherDocument the teacherDocument to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated teacherDocument,
     * or with status 400 (Bad Request) if the teacherDocument is not valid,
     * or with status 500 (Internal Server Error) if the teacherDocument couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/teacher-documents")
    @Timed
    public ResponseEntity<TeacherDocument> updateTeacherDocument(@RequestBody TeacherDocument teacherDocument) throws URISyntaxException {
        log.debug("REST request to update TeacherDocument : {}", teacherDocument);
        if (teacherDocument.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TeacherDocument result = teacherDocumentService.save(teacherDocument);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, teacherDocument.getId().toString()))
            .body(result);
    }

    /**
     * GET  /teacher-documents : get all the teacherDocuments.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of teacherDocuments in body
     */
    @GetMapping("/teacher-documents")
    @Timed
    public List<TeacherDocument> getAllTeacherDocuments() {
        log.debug("REST request to get all TeacherDocuments");
        return teacherDocumentService.findAll();
    }

    /**
     * GET  /teacher-documents/:id : get the "id" teacherDocument.
     *
     * @param id the id of the teacherDocument to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the teacherDocument, or with status 404 (Not Found)
     */
    @GetMapping("/teacher-documents/{id}")
    @Timed
    public ResponseEntity<TeacherDocument> getTeacherDocument(@PathVariable Long id) {
        log.debug("REST request to get TeacherDocument : {}", id);
        Optional<TeacherDocument> teacherDocument = teacherDocumentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(teacherDocument);
    }

    /**
     * DELETE  /teacher-documents/:id : delete the "id" teacherDocument.
     *
     * @param id the id of the teacherDocument to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/teacher-documents/{id}")
    @Timed
    public ResponseEntity<Void> deleteTeacherDocument(@PathVariable Long id) {
        log.debug("REST request to delete TeacherDocument : {}", id);
        teacherDocumentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
