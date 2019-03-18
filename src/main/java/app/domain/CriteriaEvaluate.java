package app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CriteriaEvaluate.
 */
@Entity
@Table(name = "criteria_evaluate")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CriteriaEvaluate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content")
    private String content;

    @Column(name = "jhi_level")
    private Integer level;

    @Column(name = "pass")
    private String pass;

    @Column(name = "good")
    private String good;

    @Column(name = "excellent")
    private String excellent;

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

    public CriteriaEvaluate content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getLevel() {
        return level;
    }

    public CriteriaEvaluate level(Integer level) {
        this.level = level;
        return this;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public String getPass() {
        return pass;
    }

    public CriteriaEvaluate pass(String pass) {
        this.pass = pass;
        return this;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }

    public String getGood() {
        return good;
    }

    public CriteriaEvaluate good(String good) {
        this.good = good;
        return this;
    }

    public void setGood(String good) {
        this.good = good;
    }

    public String getExcellent() {
        return excellent;
    }

    public CriteriaEvaluate excellent(String excellent) {
        this.excellent = excellent;
        return this;
    }

    public void setExcellent(String excellent) {
        this.excellent = excellent;
    }

    public CriteriaType getCriteriaType() {
        return criteriaType;
    }

    public CriteriaEvaluate criteriaType(CriteriaType criteriaType) {
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
        CriteriaEvaluate criteriaEvaluate = (CriteriaEvaluate) o;
        if (criteriaEvaluate.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), criteriaEvaluate.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CriteriaEvaluate{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            ", level=" + getLevel() +
            ", pass='" + getPass() + "'" +
            ", good='" + getGood() + "'" +
            ", excellent='" + getExcellent() + "'" +
            "}";
    }
}
