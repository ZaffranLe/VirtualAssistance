package app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CritetiaEvaluate.
 */
@Entity
@Table(name = "critetia_evaluate")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CritetiaEvaluate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content")
    private String content;

    @Column(name = "jhi_level")
    private Integer level;

    @ManyToOne
    @JsonIgnoreProperties("")
    private CriteriaType criteriaType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public CritetiaEvaluate content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getLevel() {
        return level;
    }

    public CritetiaEvaluate level(Integer level) {
        this.level = level;
        return this;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public CriteriaType getCriteriaType() {
        return criteriaType;
    }

    public CritetiaEvaluate criteriaType(CriteriaType criteriaType) {
        this.criteriaType = criteriaType;
        return this;
    }

    public void setCriteriaType(CriteriaType criteriaType) {
        this.criteriaType = criteriaType;
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
        CritetiaEvaluate critetiaEvaluate = (CritetiaEvaluate) o;
        if (critetiaEvaluate.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), critetiaEvaluate.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CritetiaEvaluate{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            ", level=" + getLevel() +
            "}";
    }
}
