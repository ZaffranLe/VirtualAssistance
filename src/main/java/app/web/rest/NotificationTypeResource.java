package app.web.rest;

import com.codahale.metrics.annotation.Timed;
import app.domain.NotificationType;
import app.service.NotificationTypeService;
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
 * REST controller for managing NotificationType.
 */
@RestController
@RequestMapping("/api")
public class NotificationTypeResource {

    private final Logger log = LoggerFactory.getLogger(NotificationTypeResource.class);

    private static final String ENTITY_NAME = "notificationType";

    private final NotificationTypeService notificationTypeService;

    public NotificationTypeResource(NotificationTypeService notificationTypeService) {
        this.notificationTypeService = notificationTypeService;
    }

    /**
     * POST  /notification-types : Create a new notificationType.
     *
     * @param notificationType the notificationType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new notificationType, or with status 400 (Bad Request) if the notificationType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/notification-types")
    @Timed
    public ResponseEntity<NotificationType> createNotificationType(@RequestBody NotificationType notificationType) throws URISyntaxException {
        log.debug("REST request to save NotificationType : {}", notificationType);
        if (notificationType.getId() != null) {
            throw new BadRequestAlertException("A new notificationType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NotificationType result = notificationTypeService.save(notificationType);
        return ResponseEntity.created(new URI("/api/notification-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /notification-types : Updates an existing notificationType.
     *
     * @param notificationType the notificationType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated notificationType,
     * or with status 400 (Bad Request) if the notificationType is not valid,
     * or with status 500 (Internal Server Error) if the notificationType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/notification-types")
    @Timed
    public ResponseEntity<NotificationType> updateNotificationType(@RequestBody NotificationType notificationType) throws URISyntaxException {
        log.debug("REST request to update NotificationType : {}", notificationType);
        if (notificationType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NotificationType result = notificationTypeService.save(notificationType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, notificationType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /notification-types : get all the notificationTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of notificationTypes in body
     */
    @GetMapping("/notification-types")
    @Timed
    public List<NotificationType> getAllNotificationTypes() {
        log.debug("REST request to get all NotificationTypes");
        return notificationTypeService.findAll();
    }

    /**
     * GET  /notification-types/:id : get the "id" notificationType.
     *
     * @param id the id of the notificationType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the notificationType, or with status 404 (Not Found)
     */
    @GetMapping("/notification-types/{id}")
    @Timed
    public ResponseEntity<NotificationType> getNotificationType(@PathVariable Long id) {
        log.debug("REST request to get NotificationType : {}", id);
        Optional<NotificationType> notificationType = notificationTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(notificationType);
    }

    /**
     * DELETE  /notification-types/:id : delete the "id" notificationType.
     *
     * @param id the id of the notificationType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/notification-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteNotificationType(@PathVariable Long id) {
        log.debug("REST request to delete NotificationType : {}", id);
        notificationTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
