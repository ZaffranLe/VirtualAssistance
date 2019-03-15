package app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

import app.domain.enumeration.Role;

/**
 * A TeacherDocument.
 */
@Entity
@Table(name = "teacher_document")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TeacherDocument implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_role")
    private Role role;

    @ManyToOne
    @JsonIgnoreProperties("teachers")
    private Teacher teacher;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private Document document;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Role getRole() {
        return role;
    }

    public TeacherDocument role(Role role) {
        this.role = role;
        return this;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public TeacherDocument teacher(Teacher teacher) {
        this.teacher = teacher;
        return this;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Document getDocument() {
        return document;
    }

    public TeacherDocument document(Document document) {
        this.document = document;
        return this;
    }

    public void setDocument(Document document) {
        this.document = document;
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
        TeacherDocument teacherDocument = (TeacherDocument) o;
        if (teacherDocument.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), teacherDocument.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TeacherDocument{" +
            "id=" + getId() +
            ", role='" + getRole() + "'" +
            "}";
    }
}
