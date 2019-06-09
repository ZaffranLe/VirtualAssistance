package app.web.rest;

import com.codahale.metrics.annotation.Timed;
import app.domain.ProofType;
import app.service.ProofTypeService;
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
 * REST controller for managing ProofType.
 */
@RestController
@RequestMapping("/api")
public class ProofTypeResource {

    private final Logger log = LoggerFactory.getLogger(ProofTypeResource.class);

    private static final String ENTITY_NAME = "proofType";

    private final ProofTypeService proofTypeService;

    public ProofTypeResource(ProofTypeService proofTypeService) {
        this.proofTypeService = proofTypeService;
    }

    /**
     * POST  /proof-types : Create a new proofType.
     *
     * @param proofType the proofType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new proofType, or with status 400 (Bad Request) if the proofType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/proof-types")
    @Timed
    public ResponseEntity<ProofType> createProofType(@RequestBody ProofType proofType) throws URISyntaxException {
        log.debug("REST request to save ProofType : {}", proofType);
        if (proofType.getId() != null) {
            throw new BadRequestAlertException("A new proofType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProofType result = proofTypeService.save(proofType);
        return ResponseEntity.created(new URI("/api/proof-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /proof-types : Updates an existing proofType.
     *
     * @param proofType the proofType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated proofType,
     * or with status 400 (Bad Request) if the proofType is not valid,
     * or with status 500 (Internal Server Error) if the proofType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/proof-types")
    @Timed
    public ResponseEntity<ProofType> updateProofType(@RequestBody ProofType proofType) throws URISyntaxException {
        log.debug("REST request to update ProofType : {}", proofType);
        if (proofType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProofType result = proofTypeService.save(proofType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, proofType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /proof-types : get all the proofTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of proofTypes in body
     */
    @GetMapping("/proof-types")
    @Timed
    public List<ProofType> getAllProofTypes() {
        log.debug("REST request to get all ProofTypes");
        return proofTypeService.findAll();
    }

    /**
     * GET  /proof-types/:id : get the "id" proofType.
     *
     * @param id the id of the proofType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the proofType, or with status 404 (Not Found)
     */
    @GetMapping("/proof-types/{id}")
    @Timed
    public ResponseEntity<ProofType> getProofType(@PathVariable Long id) {
        log.debug("REST request to get ProofType : {}", id);
        Optional<ProofType> proofType = proofTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(proofType);
    }

    /**
     * DELETE  /proof-types/:id : delete the "id" proofType.
     *
     * @param id the id of the proofType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/proof-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteProofType(@PathVariable Long id) {
        log.debug("REST request to delete ProofType : {}", id);
        proofTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
