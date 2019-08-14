package app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Proofs.
 */
@Entity
@Table(name = "proofs")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Proofs implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "url")
    private String url;

    @ManyToOne(cascade = {CascadeType.ALL},fetch = FetchType.LAZY)
    @JsonIgnoreProperties("")
    private ProofType type;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "proofs_answer",
               joinColumns = @JoinColumn(name = "proofs_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "answers_id", referencedColumnName = "id"))
    private Set<Answer> answers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Proofs name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public Proofs url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public ProofType getType() {
        return type;
    }

    public Proofs type(ProofType proofType) {
        this.type = proofType;
        return this;
    }

    public void setType(ProofType proofType) {
        this.type = proofType;
    }

    public Set<Answer> getAnswers() {
        return answers;
    }

    public Proofs answers(Set<Answer> answers) {
        this.answers = answers;
        return this;
    }

    public Proofs addAnswer(Answer answer) {
        this.answers.add(answer);
        answer.getProffs().add(this);
        return this;
    }

    public Proofs removeAnswer(Answer answer) {
        this.answers.remove(answer);
        answer.getProffs().remove(this);
        return this;
    }

    public void setAnswers(Set<Answer> answers) {
        this.answers = answers;
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
        Proofs proofs = (Proofs) o;
        if (proofs.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), proofs.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Proofs{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", url='" + getUrl() + "'" +
            ", Type='" + getType() + "'" +
            "}";
    }
}
