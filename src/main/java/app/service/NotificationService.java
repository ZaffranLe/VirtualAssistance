package app.service;

import app.domain.Notification;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
     * Get all the Notification with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<Notification> findAllWithEagerRelationships(Pageable pageable);
    
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
