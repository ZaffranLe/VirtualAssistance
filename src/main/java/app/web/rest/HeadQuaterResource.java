package app.web.rest;

import com.codahale.metrics.annotation.Timed;
import app.domain.HeadQuater;
import app.service.HeadQuaterService;
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
 * REST controller for managing HeadQuater.
 */
@RestController
@RequestMapping("/api")
public class HeadQuaterResource {

    private final Logger log = LoggerFactory.getLogger(HeadQuaterResource.class);

    private static final String ENTITY_NAME = "headQuater";

    private final HeadQuaterService headQuaterService;

    public HeadQuaterResource(HeadQuaterService headQuaterService) {
        this.headQuaterService = headQuaterService;
    }

    /**
     * POST  /head-quaters : Create a new headQuater.
     *
     * @param headQuater the headQuater to create
     * @return the ResponseEntity with status 201 (Created) and with body the new headQuater, or with status 400 (Bad Request) if the headQuater has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/head-quaters")
    @Timed
    public ResponseEntity<HeadQuater> createHeadQuater(@RequestBody HeadQuater headQuater) throws URISyntaxException {
        log.debug("REST request to save HeadQuater : {}", headQuater);
        if (headQuater.getId() != null) {
            throw new BadRequestAlertException("A new headQuater cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HeadQuater result = headQuaterService.save(headQuater);
        return ResponseEntity.created(new URI("/api/head-quaters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /head-quaters : Updates an existing headQuater.
     *
     * @param headQuater the headQuater to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated headQuater,
     * or with status 400 (Bad Request) if the headQuater is not valid,
     * or with status 500 (Internal Server Error) if the headQuater couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/head-quaters")
    @Timed
    public ResponseEntity<HeadQuater> updateHeadQuater(@RequestBody HeadQuater headQuater) throws URISyntaxException {
        log.debug("REST request to update HeadQuater : {}", headQuater);
        if (headQuater.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HeadQuater result = headQuaterService.save(headQuater);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, headQuater.getId().toString()))
            .body(result);
    }

    /**
     * GET  /head-quaters : get all the headQuaters.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of headQuaters in body
     */
    @GetMapping("/head-quaters")
    @Timed
    public List<HeadQuater> getAllHeadQuaters() {
        log.debug("REST request to get all HeadQuaters");
        return headQuaterService.findAll();
    }

    /**
     * GET  /head-quaters/:id : get the "id" headQuater.
     *
     * @param id the id of the headQuater to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the headQuater, or with status 404 (Not Found)
     */
    @GetMapping("/head-quaters/{id}")
    @Timed
    public ResponseEntity<HeadQuater> getHeadQuater(@PathVariable Long id) {
        log.debug("REST request to get HeadQuater : {}", id);
        Optional<HeadQuater> headQuater = headQuaterService.findOne(id);
        return ResponseUtil.wrapOrNotFound(headQuater);
    }

    /**
     * DELETE  /head-quaters/:id : delete the "id" headQuater.
     *
     * @param id the id of the headQuater to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/head-quaters/{id}")
    @Timed
    public ResponseEntity<Void> deleteHeadQuater(@PathVariable Long id) {
        log.debug("REST request to delete HeadQuater : {}", id);
        headQuaterService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
