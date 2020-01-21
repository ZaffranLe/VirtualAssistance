package app.repository;

import app.domain.FullEvaluate;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data repository for the FullEvaluate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FullEvaluateRepository extends JpaRepository<FullEvaluate, Long> {

    @Query("select f from FullEvaluate f inner join f.teacher t where t.id= :id order by f.id desc")
    List<FullEvaluate> findByLogin(@Param("id") Long idTeacher);
}
