package app.service.impl;

import app.domain.Answer;
import app.domain.CriteriaEvaluate;
import app.service.FullEvaluateService;
import app.domain.FullEvaluate;
import app.domain.enumeration.ScoreLadder;
import app.repository.AnswerRepository;
import app.repository.CriteriaEvaluateRepository;
import app.repository.FullEvaluateRepository;
import app.service.CriteriaEvaluateService;
import app.service.TeacherService;
import java.time.ZonedDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing FullEvaluate.
 */
@Service
@Transactional
public class FullEvaluateServiceImpl implements FullEvaluateService {

    private final Logger log = LoggerFactory.getLogger(FullEvaluateServiceImpl.class);

    private final FullEvaluateRepository fullEvaluateRepository;
    private final TeacherService teacherService;
    private final CriteriaEvaluateRepository criteriavaluateRepository;
    private final AnswerRepository answerRepository;

    public FullEvaluateServiceImpl(FullEvaluateRepository fullEvaluateRepository, TeacherService teacherService, CriteriaEvaluateRepository criteriavaluateRepository, AnswerRepository answerRepository) {
        this.fullEvaluateRepository = fullEvaluateRepository;
        this.teacherService = teacherService;
        this.criteriavaluateRepository = criteriavaluateRepository;
        this.answerRepository = answerRepository;
    }

    /**
     * Save a fullEvaluate.
     *
     * @param fullEvaluate the entity to save
     * @return the persisted entity
     */
    @Override
    public FullEvaluate save(FullEvaluate fullEvaluate) {
        log.debug("Request to save FullEvaluate : {}", fullEvaluate);
        return fullEvaluateRepository.save(fullEvaluate);
    }

    /**
     * Get all the fullEvaluates.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<FullEvaluate> findAll() {
        log.debug("Request to get all FullEvaluates");
        return fullEvaluateRepository.findAll();
    }

    /**
     * Get one fullEvaluate by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<FullEvaluate> findOne(Long id) {
        log.debug("Request to get FullEvaluate : {}", id);
        return fullEvaluateRepository.findById(id);
    }

    /**
     * Delete the fullEvaluate by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete FullEvaluate : {}", id);
        fullEvaluateRepository.deleteById(id);
    }

    @Override
    public FullEvaluate create(String result, String[] questionresult) {
        System.out.print("alo");
        FullEvaluate fullEvaluate = new FullEvaluate();
        fullEvaluate.setTeacher(teacherService.findByUserLogin());
        fullEvaluate.setDescription("Bản đánh giá " + ZonedDateTime.now());
        switch (result) {
            case "Chưa đạt":
                fullEvaluate.setResult(ScoreLadder.FAIL);
                break;
            case "Đạt":
                fullEvaluate.setResult(ScoreLadder.PASS);
                break;
            case "Khá":
                fullEvaluate.setResult(ScoreLadder.GOOD);
                break;
            case "Tốt":
                fullEvaluate.setResult(ScoreLadder.EXCELLENT);
                break;
        }
        fullEvaluateRepository.save(fullEvaluate);
        for (int i = 0; i < questionresult.length; i++) {
            Answer answer = new Answer();
            CriteriaEvaluate criteriaEvaluate = criteriavaluateRepository.findOneById(Integer.toUnsignedLong(i+1));
            answer.setCriteriaEvaluate(criteriaEvaluate);
            answer.setFullEvaluate(fullEvaluate);
            switch (questionresult[i]) {
                case "1":
                    answer.scoreLadder(ScoreLadder.FAIL);
                    break;
                case "2":
                    answer.scoreLadder(ScoreLadder.PASS);
                    break;
                case "3":
                    answer.scoreLadder(ScoreLadder.GOOD);
                    break;
                case "4":
                    answer.scoreLadder(ScoreLadder.EXCELLENT);
                    break;

            }
            answerRepository.save(answer);

        }

        return fullEvaluateRepository.save(fullEvaluate);
    }
}
