package app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import app.domain.enumeration.ScoreLadder;

/**
 * A FullEvaluate.
 */
@Entity
@Table(name = "full_evaluate")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class FullEvaluate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(name = "result")
    private ScoreLadder result;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Teacher teacher;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public FullEvaluate description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ScoreLadder getResult() {
        return result;
    }

    public FullEvaluate result(ScoreLadder result) {
        this.result = result;
        return this;
    }

    public void setResult(ScoreLadder result) {
        this.result = result;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public FullEvaluate teacher(Teacher teacher) {
        this.teacher = teacher;
        return this;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
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
        FullEvaluate fullEvaluate = (FullEvaluate) o;
        if (fullEvaluate.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fullEvaluate.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FullEvaluate{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", result='" + getResult() + "'" +
            "}";
    }
}
