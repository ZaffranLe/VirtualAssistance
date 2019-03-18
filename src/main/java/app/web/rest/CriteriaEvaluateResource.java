package app.web.rest;

import com.codahale.metrics.annotation.Timed;
import app.domain.CriteriaEvaluate;
import app.service.CriteriaEvaluateService;
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
 * REST controller for managing CriteriaEvaluate.
 */
@RestController
@RequestMapping("/api")
public class CriteriaEvaluateResource {

    private final Logger log = LoggerFactory.getLogger(CriteriaEvaluateResource.class);

    private static final String ENTITY_NAME = "criteriaEvaluate";

    private final CriteriaEvaluateService criteriaEvaluateService;

    public CriteriaEvaluateResource(CriteriaEvaluateService criteriaEvaluateService) {
        this.criteriaEvaluateService = criteriaEvaluateService;
    }

    /**
     * POST  /criteria-evaluates : Create a new criteriaEvaluate.
     *
     * @param criteriaEvaluate the criteriaEvaluate to create
     * @return the ResponseEntity with status 201 (Created) and with body the new criteriaEvaluate, or with status 400 (Bad Request) if the criteriaEvaluate has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/criteria-evaluates")
    @Timed
    public ResponseEntity<CriteriaEvaluate> createCriteriaEvaluate(@RequestBody CriteriaEvaluate criteriaEvaluate) throws URISyntaxException {
        log.debug("REST request to save CriteriaEvaluate : {}", criteriaEvaluate);
        if (criteriaEvaluate.getId() != null) {
            throw new BadRequestAlertException("A new criteriaEvaluate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CriteriaEvaluate result = criteriaEvaluateService.save(criteriaEvaluate);
        return ResponseEntity.created(new URI("/api/criteria-evaluates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /criteria-evaluates : Updates an existing criteriaEvaluate.
     *
     * @param criteriaEvaluate the criteriaEvaluate to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated criteriaEvaluate,
     * or with status 400 (Bad Request) if the criteriaEvaluate is not valid,
     * or with status 500 (Internal Server Error) if the criteriaEvaluate couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/criteria-evaluates")
    @Timed
    public ResponseEntity<CriteriaEvaluate> updateCriteriaEvaluate(@RequestBody CriteriaEvaluate criteriaEvaluate) throws URISyntaxException {
        log.debug("REST request to update CriteriaEvaluate : {}", criteriaEvaluate);
        if (criteriaEvaluate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CriteriaEvaluate result = criteriaEvaluateService.save(criteriaEvaluate);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, criteriaEvaluate.getId().toString()))
            .body(result);
    }

    /**
     * GET  /criteria-evaluates : get all the criteriaEvaluates.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of criteriaEvaluates in body
     */
    @GetMapping("/criteria-evaluates")
    @Timed
    public List<CriteriaEvaluate> getAllCriteriaEvaluates() {
        log.debug("REST request to get all CriteriaEvaluates");
        return criteriaEvaluateService.findAll();
    }

    /**
     * GET  /criteria-evaluates/:id : get the "id" criteriaEvaluate.
     *
     * @param id the id of the criteriaEvaluate to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the criteriaEvaluate, or with status 404 (Not Found)
     */
    @GetMapping("/criteria-evaluates/{id}")
    @Timed
    public ResponseEntity<CriteriaEvaluate> getCriteriaEvaluate(@PathVariable Long id) {
        log.debug("REST request to get CriteriaEvaluate : {}", id);
        Optional<CriteriaEvaluate> criteriaEvaluate = criteriaEvaluateService.findOne(id);
        return ResponseUtil.wrapOrNotFound(criteriaEvaluate);
    }

    /**
     * DELETE  /criteria-evaluates/:id : delete the "id" criteriaEvaluate.
     *
     * @param id the id of the criteriaEvaluate to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/criteria-evaluates/{id}")
    @Timed
    public ResponseEntity<Void> deleteCriteriaEvaluate(@PathVariable Long id) {
        log.debug("REST request to delete CriteriaEvaluate : {}", id);
        criteriaEvaluateService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
