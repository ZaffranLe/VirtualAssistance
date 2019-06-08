package app.repository;

import app.domain.Forum;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Forum entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ForumRepository extends JpaRepository<Forum, Long> {

    @Query("select forum from Forum forum where forum.user.login = ?#{principal.username}")
    List<Forum> findByUserIsCurrentUser();

    @Query("select forum from Forum forum where forum.level = 1")
    List<Forum> findByLeVel1();

    @Query("select forum from Forum forum where forum.forum.id = :idroot")
    List<Forum> findRByRoot(@Param("idroot")Long idroot);

}
