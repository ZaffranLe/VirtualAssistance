package app.web.rest;

import com.codahale.metrics.annotation.Timed;
import app.domain.FullEvaluate;
import app.service.FullEvaluateService;
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
 * REST controller for managing FullEvaluate.
 */
@RestController
@RequestMapping("/api")
public class FullEvaluateResource {

    private final Logger log = LoggerFactory.getLogger(FullEvaluateResource.class);

    private static final String ENTITY_NAME = "fullEvaluate";

    private final FullEvaluateService fullEvaluateService;

    public FullEvaluateResource(FullEvaluateService fullEvaluateService) {
        this.fullEvaluateService = fullEvaluateService;
    }

    /**
     * POST /full-evaluates : Create a new fullEvaluate.
     *
     * @param fullEvaluate the fullEvaluate to create
     * @return the ResponseEntity with status 201 (Created) and with body the
     * new fullEvaluate, or with status 400 (Bad Request) if the fullEvaluate
     * has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/full-evaluates")
    @Timed
    public ResponseEntity<FullEvaluate> createFullEvaluate(@RequestBody FullEvaluate fullEvaluate) throws URISyntaxException {
        log.debug("REST request to save FullEvaluate : {}", fullEvaluate);
        if (fullEvaluate.getId() != null) {
            throw new BadRequestAlertException("A new fullEvaluate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FullEvaluate result = fullEvaluateService.save(fullEvaluate);
        return ResponseEntity.created(new URI("/api/full-evaluates/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    /**
     * PUT /full-evaluates : Updates an existing fullEvaluate.
     *
     * @param fullEvaluate the fullEvaluate to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     * fullEvaluate, or with status 400 (Bad Request) if the fullEvaluate is not
     * valid, or with status 500 (Internal Server Error) if the fullEvaluate
     * couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/full-evaluates")
    @Timed
    public ResponseEntity<FullEvaluate> updateFullEvaluate(@RequestBody FullEvaluate fullEvaluate) throws URISyntaxException {
        log.debug("REST request to update FullEvaluate : {}", fullEvaluate);
        if (fullEvaluate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FullEvaluate result = fullEvaluateService.save(fullEvaluate);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fullEvaluate.getId().toString()))
                .body(result);
    }

    /**
     * GET /full-evaluates : get all the fullEvaluates.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of
     * fullEvaluates in body
     */
    @GetMapping("/full-evaluates")
    @Timed
    public List<FullEvaluate> getAllFullEvaluates() {
        log.debug("REST request to get all FullEvaluates");
        return fullEvaluateService.findAll();
    }
    @GetMapping("/full-evaluates-bylogin")
    @Timed
    public List<FullEvaluate> getAllFullEvaluatesBylogin() {
        log.debug("REST request to get all FullEvaluates");
        return fullEvaluateService.findByLogin();
    }

    /**
     * GET /full-evaluates/:id : get the "id" fullEvaluate.
     *
     * @param id the id of the fullEvaluate to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the
     * fullEvaluate, or with status 404 (Not Found)
     */
    @GetMapping("/full-evaluates/{id}")
    @Timed
    public ResponseEntity<FullEvaluate> getFullEvaluate(@PathVariable Long id) {
        log.debug("REST request to get FullEvaluate : {}", id);
        Optional<FullEvaluate> fullEvaluate = fullEvaluateService.findOne(id);
        return ResponseUtil.wrapOrNotFound(fullEvaluate);
    }

    /**
     * DELETE /full-evaluates/:id : delete the "id" fullEvaluate.
     *
     * @param id the id of the fullEvaluate to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/full-evaluates/{id}")
    @Timed
    public ResponseEntity<Void> deleteFullEvaluate(@PathVariable Long id) {
        log.debug("REST request to delete FullEvaluate : {}", id);
        fullEvaluateService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @PostMapping("/create-full-evaluates/{questionresult}/{result}")
    @Timed
    public ResponseEntity<Void> createEvaluate(@PathVariable(name="questionresult") String[] questionresult,@PathVariable(name="result") String finalresult) throws URISyntaxException {
         fullEvaluateService.create( finalresult, questionresult);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, null)).build();

    }
    @PostMapping("/create-full-evaluates/{questionresult}/{result}/{nameSurvey}")
    @Timed
    public ResponseEntity<Void> createEvaluateWithName(@PathVariable(name="questionresult") String[] questionresult,
                                                        @PathVariable(name="result") String finalresult,
                                                        @PathVariable(name="nameSurvey") String nameSurvey,
                                                        @RequestParam String[] fileResult) throws URISyntaxException {
        System.out.println(fileResult);
        fullEvaluateService.create(finalresult, questionresult,nameSurvey,fileResult);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, null)).build();

    }

}
