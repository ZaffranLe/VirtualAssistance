package app.repository;

import app.domain.CritetiaEvaluate;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CritetiaEvaluate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CritetiaEvaluateRepository extends JpaRepository<CritetiaEvaluate, Long> {

}
