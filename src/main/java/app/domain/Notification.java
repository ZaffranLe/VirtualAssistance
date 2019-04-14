package app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import app.domain.enumeration.Status;

import app.domain.enumeration.Extension;

/**
 * A Notification.
 */
@Entity
@Table(name = "notification")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Notification implements Serializable {

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

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "tag")
    private String tag;

    @Enumerated(EnumType.STRING)
    @Column(name = "file_extension")
    private Extension fileExtension;

    @ManyToOne
    @JsonIgnoreProperties("")
    private HeadQuater headQuater;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "notification_document_type",
               joinColumns = @JoinColumn(name = "notifications_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "document_types_id", referencedColumnName = "id"))
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

    public Notification name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Notification description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getuRL() {
        return uRL;
    }

    public Notification uRL(String uRL) {
        this.uRL = uRL;
        return this;
    }

    public void setuRL(String uRL) {
        this.uRL = uRL;
    }

    public Status getStatus() {
        return status;
    }

    public Notification status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getTag() {
        return tag;
    }

    public Notification tag(String tag) {
        this.tag = tag;
        return this;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public Extension getFileExtension() {
        return fileExtension;
    }

    public Notification fileExtension(Extension fileExtension) {
        this.fileExtension = fileExtension;
        return this;
    }

    public void setFileExtension(Extension fileExtension) {
        this.fileExtension = fileExtension;
    }

    public HeadQuater getHeadQuater() {
        return headQuater;
    }

    public Notification headQuater(HeadQuater headQuater) {
        this.headQuater = headQuater;
        return this;
    }

    public void setHeadQuater(HeadQuater headQuater) {
        this.headQuater = headQuater;
    }

    public Set<DocumentType> getDocumentTypes() {
        return documentTypes;
    }

    public Notification documentTypes(Set<DocumentType> documentTypes) {
        this.documentTypes = documentTypes;
        return this;
    }

    public Notification addDocumentType(DocumentType documentType) {
        this.documentTypes.add(documentType);
        documentType.getNotifications().add(this);
        return this;
    }

    public Notification removeDocumentType(DocumentType documentType) {
        this.documentTypes.remove(documentType);
        documentType.getNotifications().remove(this);
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
        Notification notification = (Notification) o;
        if (notification.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), notification.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Notification{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", uRL='" + getuRL() + "'" +
            ", status='" + getStatus() + "'" +
            ", tag='" + getTag() + "'" +
            ", fileExtension='" + getFileExtension() + "'" +
            "}";
    }
}
