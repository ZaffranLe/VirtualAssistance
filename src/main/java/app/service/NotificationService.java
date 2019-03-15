package app.service;

import app.domain.Notification;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Notification.
 */
public interface NotificationService {

    /**
     * Save a notification.
     *
     * @param notification the entity to save
     * @return the persisted entity
     */
    Notification save(Notification notification);

    /**
     * Get all the notifications.
     *
     * @return the list of entities
     */
    List<Notification> findAll();


    /**
     * Get the "id" notification.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Notification> findOne(Long id);

    /**
     * Delete the "id" notification.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
