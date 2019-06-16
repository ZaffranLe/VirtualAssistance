package app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import app.domain.enumeration.ScoreLadder;

/**
 * A Answer.
 */
@Entity
@Table(name = "answer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Answer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "score_ladder")
    private ScoreLadder scoreLadder;

    @Column(name = "proof")
    private String proof;

    @ManyToOne
    @JsonIgnoreProperties("")
    private FullEvaluate fullEvaluate;

    @ManyToOne
    @JsonIgnoreProperties("")
    private CriteriaEvaluate criteriaEvaluate;

    @ManyToMany(mappedBy = "answers")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONE)
    private Set<Proofs> proffs = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ScoreLadder getScoreLadder() {
        return scoreLadder;
    }

    public Answer scoreLadder(ScoreLadder scoreLadder) {
        this.scoreLadder = scoreLadder;
        return this;
    }

    public void setScoreLadder(ScoreLadder scoreLadder) {
        this.scoreLadder = scoreLadder;
    }

    public String getProof() {
        return proof;
    }

    public Answer proof(String proof) {
        this.proof = proof;
        return this;
    }

    public void setProof(String proof) {
        this.proof = proof;
    }

    public FullEvaluate getFullEvaluate() {
        return fullEvaluate;
    }

    public Answer fullEvaluate(FullEvaluate fullEvaluate) {
        this.fullEvaluate = fullEvaluate;
        return this;
    }

    public void setFullEvaluate(FullEvaluate fullEvaluate) {
        this.fullEvaluate = fullEvaluate;
    }

    public CriteriaEvaluate getCriteriaEvaluate() {
        return criteriaEvaluate;
    }

    public Answer criteriaEvaluate(CriteriaEvaluate criteriaEvaluate) {
        this.criteriaEvaluate = criteriaEvaluate;
        return this;
    }

    public void setCriteriaEvaluate(CriteriaEvaluate criteriaEvaluate) {
        this.criteriaEvaluate = criteriaEvaluate;
    }

    public Set<Proofs> getProffs() {
        return proffs;
    }

    public Answer proffs(Set<Proofs> proofs) {
        this.proffs = proofs;
        return this;
    }

    public Answer addProffs(Proofs proofs) {
        this.proffs.add(proofs);
        proofs.getAnswers().add(this);
        return this;
    }

    public Answer removeProffs(Proofs proofs) {
        this.proffs.remove(proofs);
        proofs.getAnswers().remove(this);
        return this;
    }

    public void setProffs(Set<Proofs> proofs) {
        this.proffs = proofs;
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
        Answer answer = (Answer) o;
        if (answer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), answer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Answer{" +
            "id=" + getId() +
            ", scoreLadder='" + getScoreLadder() + "'" +
            ", proof='" + getProof() + "'" +
            "}";
    }
}
