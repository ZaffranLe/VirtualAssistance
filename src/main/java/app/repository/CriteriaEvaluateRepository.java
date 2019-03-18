package app.repository;

import app.domain.CriteriaEvaluate;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CriteriaEvaluate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CriteriaEvaluateRepository extends JpaRepository<CriteriaEvaluate, Long> {

}
