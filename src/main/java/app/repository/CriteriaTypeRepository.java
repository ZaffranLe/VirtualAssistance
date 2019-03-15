package app.repository;

import app.domain.CriteriaType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CriteriaType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CriteriaTypeRepository extends JpaRepository<CriteriaType, Long> {

}
