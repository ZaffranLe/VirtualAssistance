package app.web.rest;

import com.codahale.metrics.annotation.Timed;
import app.domain.Forum;
import app.security.SecurityUtils;
import app.service.ForumService;
import app.service.UserService;
import app.web.rest.errors.BadRequestAlertException;
import app.web.rest.payload.ForumAnswDTO;
import app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Forum.
 */
@RestController
@RequestMapping("/api")
public class ForumResource {

    private final Logger log = LoggerFactory.getLogger(ForumResource.class);

    private static final String ENTITY_NAME = "forum";

    private final ForumService forumService;
    private final UserService userService;

    public ForumResource(ForumService forumService, UserService userService) {
        this.forumService = forumService;
        this.userService = userService;

    }

    /**
     * POST /forums : Create a new forum.
     *
     * @param forum the forum to create
     * @return the ResponseEntity with status 201 (Created) and with body the new
     *         forum, or with status 400 (Bad Request) if the forum has already an
     *         ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/forums")
    @Timed
    public ResponseEntity<Forum> createForum(@RequestBody Forum forum) throws URISyntaxException {
        log.debug("REST request to save Forum : {}", forum);
        if (forum.getId() != null) {
            throw new BadRequestAlertException("A new forum cannot already have an ID", ENTITY_NAME, "idexists");
        }
        forum.setForum(null);
        forum.setLevel(1);
        forum.setCreateDay(ZonedDateTime.now());
        forum.setUser(userService.getUserWithAuthorities().get());
        Forum result = forumService.save(forum);
        return ResponseEntity.created(new URI("/api/forums/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    @PostMapping("/forumsnewtopic")
    @Timed
    public ResponseEntity<Forum> createForumNewtopic(@RequestBody ForumAnswDTO forumasw) throws URISyntaxException {
        log.debug("REST request to save ForumAnsw : {}", forumasw);
        Forum root = forumService.findOne(forumasw.getIdroot()).get();
        if (root == null) {
            throw new BadRequestAlertException("A new forum dont have have an root", ENTITY_NAME, "notroot");

        }
        Forum forum = new Forum();

        forum.setTitle(forumasw.getTitle());
        forum.setContent(forumasw.getContent());
        forum.setForum(root);
        forum.setLevel(2);
        forum.setCreateDay(ZonedDateTime.now());
        forum.setUser(userService.getUserWithAuthorities().get());

        Forum result = forumService.save(forum);

        return ResponseEntity.created(new URI("/api/forums/list/" + forumasw.getIdroot()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(root);
    }

    /**
     * PUT /forums : Updates an existing forum.
     *
     * @param forum the forum to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     *         forum, or with status 400 (Bad Request) if the forum is not valid, or
     *         with status 500 (Internal Server Error) if the forum couldn't be
     *         updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/forums")
    @Timed
    public ResponseEntity<Forum> updateForum(@RequestBody Forum forum) throws URISyntaxException {
        log.debug("REST request to update Forum : {}", forum);
        if (forum.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Forum result = forumService.save(forum);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, forum.getId().toString()))
                .body(result);
    }

    /**
     * GET /forums : get all the forums.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of forums in
     *         body
     */
    @GetMapping("/forums")
    @Timed
    public List<Forum> getAllForums() {
        log.debug("REST request to get all Forums");
        return forumService.findAll();
    }

    /**
     * GET /forums/:id : get the "id" forum.
     *
     * @param id the id of the forum to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the forum, or
     *         with status 404 (Not Found)
     */
    @GetMapping("/forums/{id}")
    @Timed
    public ResponseEntity<Forum> getForum(@PathVariable Long id) {
        log.debug("REST request to get Forum : {}", id);
        Optional<Forum> forum = forumService.findOne(id);
        return ResponseUtil.wrapOrNotFound(forum);
    }

    /**
     * DELETE /forums/:id : delete the "id" forum.
     *
     * @param id the id of the forum to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/forums/{id}")
    @Timed
    public ResponseEntity<Void> deleteForum(@PathVariable Long id) {
        log.debug("REST request to delete Forum : {}", id);
        forumService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
