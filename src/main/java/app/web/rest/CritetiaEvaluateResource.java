package app.web.rest;

import com.codahale.metrics.annotation.Timed;
import app.domain.CritetiaEvaluate;
import app.service.CritetiaEvaluateService;
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
 * REST controller for managing CritetiaEvaluate.
 */
@RestController
@RequestMapping("/api")
public class CritetiaEvaluateResource {

    private final Logger log = LoggerFactory.getLogger(CritetiaEvaluateResource.class);

    private static final String ENTITY_NAME = "critetiaEvaluate";

    private final CritetiaEvaluateService critetiaEvaluateService;

    public CritetiaEvaluateResource(CritetiaEvaluateService critetiaEvaluateService) {
        this.critetiaEvaluateService = critetiaEvaluateService;
    }

    /**
     * POST  /critetia-evaluates : Create a new critetiaEvaluate.
     *
     * @param critetiaEvaluate the critetiaEvaluate to create
     * @return the ResponseEntity with status 201 (Created) and with body the new critetiaEvaluate, or with status 400 (Bad Request) if the critetiaEvaluate has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/critetia-evaluates")
    @Timed
    public ResponseEntity<CritetiaEvaluate> createCritetiaEvaluate(@RequestBody CritetiaEvaluate critetiaEvaluate) throws URISyntaxException {
        log.debug("REST request to save CritetiaEvaluate : {}", critetiaEvaluate);
        if (critetiaEvaluate.getId() != null) {
            throw new BadRequestAlertException("A new critetiaEvaluate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CritetiaEvaluate result = critetiaEvaluateService.save(critetiaEvaluate);
        return ResponseEntity.created(new URI("/api/critetia-evaluates/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /critetia-evaluates : Updates an existing critetiaEvaluate.
     *
     * @param critetiaEvaluate the critetiaEvaluate to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated critetiaEvaluate,
     * or with status 400 (Bad Request) if the critetiaEvaluate is not valid,
     * or with status 500 (Internal Server Error) if the critetiaEvaluate couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/critetia-evaluates")
    @Timed
    public ResponseEntity<CritetiaEvaluate> updateCritetiaEvaluate(@RequestBody CritetiaEvaluate critetiaEvaluate) throws URISyntaxException {
        log.debug("REST request to update CritetiaEvaluate : {}", critetiaEvaluate);
        if (critetiaEvaluate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CritetiaEvaluate result = critetiaEvaluateService.save(critetiaEvaluate);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, critetiaEvaluate.getId().toString()))
            .body(result);
    }

    /**
     * GET  /critetia-evaluates : get all the critetiaEvaluates.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of critetiaEvaluates in body
     */
    @GetMapping("/critetia-evaluates")
    @Timed
    public List<CritetiaEvaluate> getAllCritetiaEvaluates() {
        log.debug("REST request to get all CritetiaEvaluates");
        return critetiaEvaluateService.findAll();
    }

    /**
     * GET  /critetia-evaluates/:id : get the "id" critetiaEvaluate.
     *
     * @param id the id of the critetiaEvaluate to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the critetiaEvaluate, or with status 404 (Not Found)
     */
    @GetMapping("/critetia-evaluates/{id}")
    @Timed
    public ResponseEntity<CritetiaEvaluate> getCritetiaEvaluate(@PathVariable Long id) {
        log.debug("REST request to get CritetiaEvaluate : {}", id);
        Optional<CritetiaEvaluate> critetiaEvaluate = critetiaEvaluateService.findOne(id);
        return ResponseUtil.wrapOrNotFound(critetiaEvaluate);
    }

    /**
     * DELETE  /critetia-evaluates/:id : delete the "id" critetiaEvaluate.
     *
     * @param id the id of the critetiaEvaluate to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/critetia-evaluates/{id}")
    @Timed
    public ResponseEntity<Void> deleteCritetiaEvaluate(@PathVariable Long id) {
        log.debug("REST request to delete CritetiaEvaluate : {}", id);
        critetiaEvaluateService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
