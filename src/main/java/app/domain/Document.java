package app.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import app.domain.enumeration.Status;

/**
 * A Document.
 */
@Entity
@Table(name = "document")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Document implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "u_rl")
    private String uRL;

    @Column(name = "jhi_size")
    private Integer size;

    @Column(name = "tag")
    private String tag;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "is_shared")
    private Boolean isShared;

    @OneToMany(mappedBy = "document")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TeacherDocument> documents = new HashSet<>();
    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "document_document_type",
               joinColumns = @JoinColumn(name = "document_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "document_type_id", referencedColumnName = "id"))
    private Set<DocumentType> documentTypes = new HashSet<>();

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

    public Document name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Document description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getuRL() {
        return uRL;
    }

    public Document uRL(String uRL) {
        this.uRL = uRL;
        return this;
    }

    public void setuRL(String uRL) {
        this.uRL = uRL;
    }

    public Integer getSize() {
        return size;
    }

    public Document size(Integer size) {
        this.size = size;
        return this;
    }

    public void setSize(Integer size) {
        this.size = size;
    }

    public String getTag() {
        return tag;
    }

    public Document tag(String tag) {
        this.tag = tag;
        return this;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public Status getStatus() {
        return status;
    }

    public Document status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Boolean isIsShared() {
        return isShared;
    }

    public Document isShared(Boolean isShared) {
        this.isShared = isShared;
        return this;
    }

    public void setIsShared(Boolean isShared) {
        this.isShared = isShared;
    }

    public Set<TeacherDocument> getDocuments() {
        return documents;
    }

    public Document documents(Set<TeacherDocument> teacherDocuments) {
        this.documents = teacherDocuments;
        return this;
    }

    public Document addDocument(TeacherDocument teacherDocument) {
        this.documents.add(teacherDocument);
        teacherDocument.setDocument(this);
        return this;
    }

    public Document removeDocument(TeacherDocument teacherDocument) {
        this.documents.remove(teacherDocument);
        teacherDocument.setDocument(null);
        return this;
    }

    public void setDocuments(Set<TeacherDocument> teacherDocuments) {
        this.documents = teacherDocuments;
    }

    public Set<DocumentType> getDocumentTypes() {
        return documentTypes;
    }

    public Document documentTypes(Set<DocumentType> documentTypes) {
        this.documentTypes = documentTypes;
        return this;
    }

    public Document addDocumentType(DocumentType documentType) {
        this.documentTypes.add(documentType);
        documentType.getDocuments().add(this);
        return this;
    }

    public Document removeDocumentType(DocumentType documentType) {
        this.documentTypes.remove(documentType);
        documentType.getDocuments().remove(this);
        return this;
    }

    public void setDocumentTypes(Set<DocumentType> documentTypes) {
        this.documentTypes = documentTypes;
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
        Document document = (Document) o;
        if (document.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), document.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Document{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", uRL='" + getuRL() + "'" +
            ", size=" + getSize() +
            ", tag='" + getTag() + "'" +
            ", status='" + getStatus() + "'" +
            ", isShared='" + isIsShared() + "'" +
            "}";
    }
}
