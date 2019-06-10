package app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Forum.
 */
@Entity
@Table(name = "forum")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Forum implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "create_day")
    private ZonedDateTime createDay;

    @Column(name = "jhi_level")
    private Integer level;

    @ManyToOne
    @JsonIgnoreProperties("roots")
    private Forum forum;

    @OneToMany(mappedBy = "forum")
    @Cache(usage = CacheConcurrencyStrategy.NONE)
    private Set<Forum> roots = new HashSet<>();

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Forum title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public Forum content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public ZonedDateTime getCreateDay() {
        return createDay;
    }

    public Forum createDay(ZonedDateTime createDay) {
        this.createDay = createDay;
        return this;
    }

    public void setCreateDay(ZonedDateTime createDay) {
        this.createDay = createDay;
    }

    public Integer getLevel() {
        return level;
    }

    public Forum level(Integer level) {
        this.level = level;
        return this;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Forum getForum() {
        return forum;
    }

    public Forum forum(Forum forum) {
        this.forum = forum;
        return this;
    }

    public void setForum(Forum forum) {
        this.forum = forum;
    }

    public Set<Forum> getRoots() {
        return roots;
    }

    public Forum roots(Set<Forum> forums) {
        this.roots = forums;
        return this;
    }

    public Forum addRoot(Forum forum) {
        this.roots.add(forum);
        forum.setForum(this);
        return this;
    }

    public Forum removeRoot(Forum forum) {
        this.roots.remove(forum);
        forum.setForum(null);
        return this;
    }

    public void setRoots(Set<Forum> forums) {
        this.roots = forums;
    }

    public User getUser() {
        return user;
    }

    public Forum user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Forum forum = (Forum) o;
        if (forum.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), forum.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Forum{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", content='" + getContent() + "'" +
            ", createDay='" + getCreateDay() + "'" +
            ", level=" + getLevel() +
            "}";
    }
}
