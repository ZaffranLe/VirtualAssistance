package app.service;

import app.domain.NotificationType;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing NotificationType.
 */
public interface NotificationTypeService {

    /**
     * Save a notificationType.
     *
     * @param notificationType the entity to save
     * @return the persisted entity
     */
    NotificationType save(NotificationType notificationType);

    /**
     * Get all the notificationTypes.
     *
     * @return the list of entities
     */
    List<NotificationType> findAll();


    /**
     * Get the "id" notificationType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<NotificationType> findOne(Long id);

    /**
     * Delete the "id" notificationType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
