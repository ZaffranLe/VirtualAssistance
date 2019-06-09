package app.repository;

import app.domain.Proofs;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Proofs entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProofsRepository extends JpaRepository<Proofs, Long> {

    @Query(value = "select distinct proofs from Proofs proofs left join fetch proofs.answers",
        countQuery = "select count(distinct proofs) from Proofs proofs")
    Page<Proofs> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct proofs from Proofs proofs left join fetch proofs.answers")
    List<Proofs> findAllWithEagerRelationships();

    @Query("select proofs from Proofs proofs left join fetch proofs.answers where proofs.id =:id")
    Optional<Proofs> findOneWithEagerRelationships(@Param("id") Long id);

}
