package app.web.rest;

import com.codahale.metrics.annotation.Timed;
import app.domain.CriteriaType;
import app.service.CriteriaTypeService;
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
 * REST controller for managing CriteriaType.
 */
@RestController
@RequestMapping("/api")
public class CriteriaTypeResource {

    private final Logger log = LoggerFactory.getLogger(CriteriaTypeResource.class);

    private static final String ENTITY_NAME = "criteriaType";

    private final CriteriaTypeService criteriaTypeService;

    public CriteriaTypeResource(CriteriaTypeService criteriaTypeService) {
        this.criteriaTypeService = criteriaTypeService;
    }

    /**
     * POST  /criteria-types : Create a new criteriaType.
     *
     * @param criteriaType the criteriaType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new criteriaType, or with status 400 (Bad Request) if the criteriaType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/criteria-types")
    @Timed
    public ResponseEntity<CriteriaType> createCriteriaType(@RequestBody CriteriaType criteriaType) throws URISyntaxException {
        log.debug("REST request to save CriteriaType : {}", criteriaType);
        if (criteriaType.getId() != null) {
            throw new BadRequestAlertException("A new criteriaType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CriteriaType result = criteriaTypeService.save(criteriaType);
        return ResponseEntity.created(new URI("/api/criteria-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /criteria-types : Updates an existing criteriaType.
     *
     * @param criteriaType the criteriaType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated criteriaType,
     * or with status 400 (Bad Request) if the criteriaType is not valid,
     * or with status 500 (Internal Server Error) if the criteriaType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/criteria-types")
    @Timed
    public ResponseEntity<CriteriaType> updateCriteriaType(@RequestBody CriteriaType criteriaType) throws URISyntaxException {
        log.debug("REST request to update CriteriaType : {}", criteriaType);
        if (criteriaType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CriteriaType result = criteriaTypeService.save(criteriaType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, criteriaType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /criteria-types : get all the criteriaTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of criteriaTypes in body
     */
    @GetMapping("/criteria-types")
    @Timed
    public List<CriteriaType> getAllCriteriaTypes() {
        log.debug("REST request to get all CriteriaTypes");
        return criteriaTypeService.findAll();
    }

    /**
     * GET  /criteria-types/:id : get the "id" criteriaType.
     *
     * @param id the id of the criteriaType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the criteriaType, or with status 404 (Not Found)
     */
    @GetMapping("/criteria-types/{id}")
    @Timed
    public ResponseEntity<CriteriaType> getCriteriaType(@PathVariable Long id) {
        log.debug("REST request to get CriteriaType : {}", id);
        Optional<CriteriaType> criteriaType = criteriaTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(criteriaType);
    }

    /**
     * DELETE  /criteria-types/:id : delete the "id" criteriaType.
     *
     * @param id the id of the criteriaType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/criteria-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteCriteriaType(@PathVariable Long id) {
        log.debug("REST request to delete CriteriaType : {}", id);
        criteriaTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
