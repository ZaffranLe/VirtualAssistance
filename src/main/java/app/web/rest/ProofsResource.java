package app.web.rest;

import com.codahale.metrics.annotation.Timed;
import app.domain.Proofs;
import app.service.ProofsService;
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
 * REST controller for managing Proofs.
 */
@RestController
@RequestMapping("/api")
public class ProofsResource {

    private final Logger log = LoggerFactory.getLogger(ProofsResource.class);

    private static final String ENTITY_NAME = "proofs";

    private final ProofsService proofsService;

    public ProofsResource(ProofsService proofsService) {
        this.proofsService = proofsService;
    }

    /**
     * POST  /proofs : Create a new proofs.
     *
     * @param proofs the proofs to create
     * @return the ResponseEntity with status 201 (Created) and with body the new proofs, or with status 400 (Bad Request) if the proofs has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/proofs")
    @Timed
    public ResponseEntity<Proofs> createProofs(@RequestBody Proofs proofs) throws URISyntaxException {
        log.debug("REST request to save Proofs : {}", proofs);
        if (proofs.getId() != null) {
            throw new BadRequestAlertException("A new proofs cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Proofs result = proofsService.save(proofs);
        return ResponseEntity.created(new URI("/api/proofs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /proofs : Updates an existing proofs.
     *
     * @param proofs the proofs to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated proofs,
     * or with status 400 (Bad Request) if the proofs is not valid,
     * or with status 500 (Internal Server Error) if the proofs couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/proofs")
    @Timed
    public ResponseEntity<Proofs> updateProofs(@RequestBody Proofs proofs) throws URISyntaxException {
        log.debug("REST request to update Proofs : {}", proofs);
        if (proofs.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Proofs result = proofsService.save(proofs);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, proofs.getId().toString()))
            .body(result);
    }

    /**
     * GET  /proofs : get all the proofs.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of proofs in body
     */
    @GetMapping("/proofs")
    @Timed
    public List<Proofs> getAllProofs(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Proofs");
        return proofsService.findAll();
    }

    /**
     * GET  /proofs/:id : get the "id" proofs.
     *
     * @param id the id of the proofs to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the proofs, or with status 404 (Not Found)
     */
    @GetMapping("/proofs/{id}")
    @Timed
    public ResponseEntity<Proofs> getProofs(@PathVariable Long id) {
        log.debug("REST request to get Proofs : {}", id);
        Optional<Proofs> proofs = proofsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(proofs);
    }

    /**
     * DELETE  /proofs/:id : delete the "id" proofs.
     *
     * @param id the id of the proofs to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/proofs/{id}")
    @Timed
    public ResponseEntity<Void> deleteProofs(@PathVariable Long id) {
        log.debug("REST request to delete Proofs : {}", id);
        proofsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
