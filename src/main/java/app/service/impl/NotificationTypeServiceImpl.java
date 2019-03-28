package app.service.impl;

import app.service.NotificationTypeService;
import app.domain.NotificationType;
import app.repository.NotificationTypeRepository;
import app.security.AuthoritiesConstants;
import app.security.SecurityUtils;
import app.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing NotificationType.
 */
@Service
@Transactional
public class NotificationTypeServiceImpl implements NotificationTypeService {

    private final Logger log = LoggerFactory.getLogger(NotificationTypeServiceImpl.class);

    private final NotificationTypeRepository notificationTypeRepository;

    public NotificationTypeServiceImpl(NotificationTypeRepository notificationTypeRepository) {
        this.notificationTypeRepository = notificationTypeRepository;
    }

    /**
     * Save a notificationType.
     *
     * @param notificationType the entity to save
     * @return the persisted entity
     */
    @Override
    public NotificationType save(NotificationType notificationType) {
        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            log.debug("Request to save NotificationType : {}", notificationType);
            return notificationTypeRepository.save(notificationType);
        } else {
            throw new BadRequestAlertException("Dont have authorize", null, null);
        }

    }

    /**
     * Get all the notificationTypes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<NotificationType> findAll() {
        log.debug("Request to get all NotificationTypes");
        return notificationTypeRepository.findAll();
    }

    /**
     * Get one notificationType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<NotificationType> findOne(Long id) {
        log.debug("Request to get NotificationType : {}", id);
        return notificationTypeRepository.findById(id);
    }

    /**
     * Delete the notificationType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        if (SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)) {
            log.debug("Request to delete NotificationType : {}", id);
            notificationTypeRepository.deleteById(id);
        } else {
            throw new BadRequestAlertException("Dont have authorize", null, null);
        }
    }
}
