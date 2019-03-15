package app.repository;

import app.domain.HeadQuater;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the HeadQuater entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HeadQuaterRepository extends JpaRepository<HeadQuater, Long> {

}
