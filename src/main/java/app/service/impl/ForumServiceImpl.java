package app.service.impl;

import app.service.ForumService;
import app.domain.Forum;
import app.repository.ForumRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Forum.
 */
@Service
@Transactional
public class ForumServiceImpl implements ForumService {

    private final Logger log = LoggerFactory.getLogger(ForumServiceImpl.class);

    private final ForumRepository forumRepository;

    public ForumServiceImpl(ForumRepository forumRepository) {
        this.forumRepository = forumRepository;
    }

    /**
     * Save a forum.
     *
     * @param forum the entity to save
     * @return the persisted entity
     */
    @Override
    public Forum save(Forum forum) {
        log.debug("Request to save Forum : {}", forum);
        return forumRepository.save(forum);
    }

    /**
     * Get all the forums.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Forum> findAll() {
        log.debug("Request to get all Forums");
        return forumRepository.findByLeVel1();
    }

    /**
     * Get one forum by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Forum> findOne(Long id) {
        log.debug("Request to get Forum : {}", id);
        Forum forum = forumRepository.findById(id).get();
        forum.setRoots(forumRepository.findRByRoot(forum.getId()).stream().collect(Collectors.toSet()));
        return Optional.of(forum);
    }

    /**
     * Delete the forum by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Forum : {}", id);
        forumRepository.deleteById(id);
    }
}
