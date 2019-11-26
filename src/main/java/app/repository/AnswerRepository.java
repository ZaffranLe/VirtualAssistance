package app.repository;

import app.domain.Answer;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data repository for the Answer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {

    @Query("select a from Answer a  left join fetch a.proffs where a.fullEvaluate.id = :id")
    List<Answer> getAnswersByFullEval(@Param("id") Long id);
}
