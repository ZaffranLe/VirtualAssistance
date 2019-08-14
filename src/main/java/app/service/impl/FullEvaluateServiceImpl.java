package app.service.impl;

import app.domain.Answer;
import app.domain.CriteriaEvaluate;
import app.service.FullEvaluateService;
import app.domain.FullEvaluate;
import app.domain.ProofType;
import app.domain.Proofs;
import app.domain.Teacher;
import app.domain.enumeration.ScoreLadder;
import app.repository.AnswerRepository;
import app.repository.CriteriaEvaluateRepository;
import app.repository.FullEvaluateRepository;
import app.repository.TeacherRepository;
import app.security.SecurityUtils;
import app.service.AnswerService;
import app.service.TeacherService;
import java.time.ZonedDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.function.Consumer;
import java.util.function.Predicate;

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
    TeacherRepository teacherRepository;
    private final AnswerService answerService;
    private final ProofsServiceImpl proofsServiceImpl;
    private final ProofTypeServiceImpl proofTypeServiceImpl;

    public FullEvaluateServiceImpl(AnswerService answerService, TeacherRepository teacherRepository,
            FullEvaluateRepository fullEvaluateRepository, TeacherService teacherService,
            CriteriaEvaluateRepository criteriavaluateRepository, AnswerRepository answerRepository,
            ProofsServiceImpl proofsServiceImpl, ProofTypeServiceImpl proofTypeServiceImpl) {
        this.fullEvaluateRepository = fullEvaluateRepository;
        this.teacherService = teacherService;
        this.criteriavaluateRepository = criteriavaluateRepository;
        this.answerRepository = answerRepository;
        this.teacherRepository = teacherRepository;
        this.answerService = answerService;
        this.proofsServiceImpl = proofsServiceImpl;
        this.proofTypeServiceImpl = proofTypeServiceImpl;
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

    @Override
    @Transactional(readOnly = true)
    public List<FullEvaluate> findByLogin() {
        log.debug("Request to get all FullEvaluates");
        String login = SecurityUtils.getCurrentUserLogin().get();
        Teacher teacher = teacherRepository.findOneByUser(login).get();
        return fullEvaluateRepository.findByLogin(teacher.getId());
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
            CriteriaEvaluate criteriaEvaluate = criteriavaluateRepository.findOneById(Integer.toUnsignedLong(i + 1));
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

    public FullEvaluate update(Long id, String result, String name, List<Answer> answers) {
        FullEvaluate fullEvaluate = fullEvaluateRepository.findById(id).get();
        Teacher teacher = teacherService.findByUserLogin();
        if (!fullEvaluate.getTeacher().equals(teacher))
            return null;

        fullEvaluate.setDescription(name);

        fullEvaluate.setResult(caculateResultFromAnswerList(answers));

        answers.stream().filter(new Predicate<Answer>() {
            @Override
            public boolean test(Answer t) {
                return t.getFullEvaluate().equals(fullEvaluate);
            }
        }).forEach(new Consumer<Answer>() {
            @Override
            public void accept(Answer t) {
                answerService.save(t);
            }
        });

        return fullEvaluateRepository.saveAndFlush(fullEvaluate);

    }

    @Override
    public FullEvaluate create(String result, String[] questionresult, String nameSurvey, String[] fileResult) {
        System.out.print("alo");
        FullEvaluate fullEvaluate = new FullEvaluate();
        fullEvaluate.setTeacher(teacherService.findByUserLogin());
        fullEvaluate.setDescription(nameSurvey);
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
            CriteriaEvaluate criteriaEvaluate = criteriavaluateRepository.findOneById(Integer.toUnsignedLong(i + 1));
            answer.setCriteriaEvaluate(criteriaEvaluate);
            answer.setFullEvaluate(fullEvaluate);
            answer.setProof(fileResult[i]);
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

    public FullEvaluate create(List<Answer> answers, String nameSurvey) {
        System.out.println("alo create moi: pprooofs: ");
        FullEvaluate fullEvaluate = new FullEvaluate();
        fullEvaluate.setTeacher(teacherService.findByUserLogin());
        fullEvaluate.setDescription(nameSurvey);
        fullEvaluate.setResult(caculateResultFromAnswerList(answers));
        FullEvaluate fullEvaluateok = fullEvaluateRepository.saveAndFlush(fullEvaluate);
        // fullEvaluate.
        answers.forEach(new Consumer<Answer>() {
            @Override
            public void accept(Answer ans) {
                ans.setFullEvaluate(fullEvaluateok);
                final Answer ans2 = answerRepository.saveAndFlush(ans);
                Set<Proofs> proofss = ans.getProffs();
                Set<Proofs> proofss2 = new HashSet<>();
                System.out.println("--------pprooofs: " + ans.getProffs().size());
                proofss.forEach(new Consumer<Proofs>() {
                    @Override
                    public void accept(Proofs t) {
                        System.out.println("--------pprooofssssssss: " + t);
                        if (t.getId() == null || t.getId() == 0) {
                            Proofs proofs = new Proofs();
                            proofs.setName(t.getName());
                            proofs.setUrl(t.getUrl());
                            // proofs.addAnswer(ans2);
                            if (t.getType() != null && t.getType().getId() != null) {
                                ProofType proofType = proofTypeServiceImpl.findOne(t.getType().getId()).get();
                                if (proofType != null) {
                                    proofs.setType(proofType);
                                }
                            }

                            System.out.println("saveeeeeeeeeeeeeeeeeeeeee: " + proofs);
                            Proofs proofsave = proofsServiceImpl.save(proofs);
                            // Set<Answer> answers = proofsave.getAnswers();
                            // if (answers == null) {
                            // proofsave.setAnswers(new HashSet<>());
                            // }
                            // proofsave.addAnswer(ans2);
                            // proofsave = proofsServiceImpl.save(proofsave);
                            proofss2.add(proofsave);
                            // ans2.addProffs(proofs);
                        }
                    }
                });
                for (Proofs t : proofss2) {
                    Set<Answer> answers = t.getAnswers();
                    if (answers == null) {
                        t.setAnswers(new HashSet<>());
                    }
                    t.addAnswer(ans2);
                    proofsServiceImpl.save(t);

                }

            }
        });
        return fullEvaluateok;

    }

    private ScoreLadder caculateResultFromAnswerList(List<Answer> answers) {

        ScoreLadder result = ScoreLadder.FAIL;
        // const answerFail = answers.stream().findFirst((answer) => answer.scoreLadder
        // === ScoreLadder.FAIL);
        boolean answerFail = answers.stream().anyMatch(new Predicate<Answer>() {
            @Override
            public boolean test(Answer t) {
                return t.getScoreLadder() == ScoreLadder.FAIL;
            }
        });
        if (answerFail) {
            return ScoreLadder.FAIL;
        }
        // const PASS = this.state.answerList.find((asw, index) => asw.scoreLadder ===
        // ScoreLadder.PASS && asw.criteriaEvaluate.id >= 2 && asw.criteriaEvaluate.id <
        // 7);
        boolean answerPAss = answers.stream().anyMatch(new Predicate<Answer>() {
            @Override
            public boolean test(Answer t) {
                return t.getScoreLadder() == ScoreLadder.PASS && t.getCriteriaEvaluate().getId() >= 2
                        && t.getCriteriaEvaluate().getId() < 7;
            }
        });
        if (answerPAss) {

            return ScoreLadder.PASS;

        }

        // const counterEX = this.state.answerList.filter((asw, index) =>
        // asw.scoreLadder === ScoreLadder.EXCELLENT).length;

        // const counterGOOD = this.state.answerList.filter((asw, index) =>
        // asw.scoreLadder === ScoreLadder.GOOD).length;

        long countGOOD = answers.stream().filter(new Predicate<Answer>() {
            @Override
            public boolean test(Answer t) {
                return t.getScoreLadder() == ScoreLadder.GOOD;
            }
        }).count();
        long countEX = answers.stream().filter(new Predicate<Answer>() {
            @Override
            public boolean test(Answer t) {
                return t.getScoreLadder() == ScoreLadder.EXCELLENT;
            }
        }).count();

        if (countEX + countGOOD < 10)
            return ScoreLadder.PASS;

        if (countEX > 10) {
            // const GOODS = this.state.answerList.find((asw, index) => asw.scoreLadder ===
            // ScoreLadder.GOOD && asw.criteriaEvaluate.id >= 2 && asw.criteriaEvaluate.id <
            // 7);
            boolean answerGOOD = answers.stream().anyMatch(new Predicate<Answer>() {
                @Override
                public boolean test(Answer t) {
                    return t.getScoreLadder() == ScoreLadder.GOOD && t.getCriteriaEvaluate().getId() >= 2
                            && t.getCriteriaEvaluate().getId() < 7;
                }
            });
            if (!answerGOOD) {
                return ScoreLadder.EXCELLENT;
            }
        }
        return ScoreLadder.GOOD;

    }
}
