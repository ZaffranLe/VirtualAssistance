package app.repository;

import app.domain.Teacher;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Teacher entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    @Query("Select t from Teacher t inner join t.user u where u.login =:login")
    Optional<Teacher> findOneByUser(@Param("login") String login);
}
