package app.service.impl;

import app.service.NotificationService;
import app.domain.Notification;
import app.repository.NotificationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;
/**
 * Service Implementation for managing Notification.
 */
@Service
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private final Logger log = LoggerFactory.getLogger(NotificationServiceImpl.class);

    private final NotificationRepository notificationRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    /**
     * Save a notification.
     *
     * @param notification the entity to save
     * @return the persisted entity
     */
    @Override
    public Notification save(Notification notification) {
        log.debug("Request to save Notification : {}", notification);        return notificationRepository.save(notification);
    }

    /**
     * Get all the notifications.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Notification> findAll() {
        log.debug("Request to get all Notifications");
        return notificationRepository.findAllWithEagerRelationships();
    }

    /**
     * Get all the Notification with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<Notification> findAllWithEagerRelationships(Pageable pageable) {
        return notificationRepository.findAllWithEagerRelationships(pageable);
    }
    

    /**
     * Get one notification by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Notification> findOne(Long id) {
        log.debug("Request to get Notification : {}", id);
        return notificationRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the notification by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Notification : {}", id);
        notificationRepository.deleteById(id);
    }
}
