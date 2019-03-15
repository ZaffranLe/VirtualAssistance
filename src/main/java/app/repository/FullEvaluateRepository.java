package app.repository;

import app.domain.FullEvaluate;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the FullEvaluate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FullEvaluateRepository extends JpaRepository<FullEvaluate, Long> {

}
