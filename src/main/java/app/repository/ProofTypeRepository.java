package app.repository;

import app.domain.ProofType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProofType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProofTypeRepository extends JpaRepository<ProofType, Long> {

}
