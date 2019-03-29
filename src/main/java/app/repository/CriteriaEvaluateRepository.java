package app.repository;

import app.domain.CriteriaEvaluate;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CriteriaEvaluate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CriteriaEvaluateRepository extends JpaRepository<CriteriaEvaluate, Long> {
    @Query(value = "select c from CriteriaEvaluate c where c.id =:id ")
    CriteriaEvaluate findOneById(@Param("id") Long id); 

}
