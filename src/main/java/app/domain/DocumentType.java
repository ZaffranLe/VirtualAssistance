package app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import app.domain.enumeration.Level;

/**
 * A DocumentType.
 */
@Entity
@Table(name = "document_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class DocumentType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_level")
    private Level level;

    @ManyToMany(mappedBy = "documentTypes")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Document> documents = new HashSet<>();

    @ManyToMany(mappedBy = "documentTypes")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Notification> notifications = new HashSet<>();

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

    public DocumentType content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Level getLevel() {
        return level;
    }

    public DocumentType level(Level level) {
        this.level = level;
        return this;
    }

    public void setLevel(Level level) {
        this.level = level;
    }

    public Set<Document> getDocuments() {
        return documents;
    }

    public DocumentType documents(Set<Document> documents) {
        this.documents = documents;
        return this;
    }

    public DocumentType addDocument(Document document) {
        this.documents.add(document);
        document.getDocumentTypes().add(this);
        return this;
    }

    public DocumentType removeDocument(Document document) {
        this.documents.remove(document);
        document.getDocumentTypes().remove(this);
        return this;
    }

    public void setDocuments(Set<Document> documents) {
        this.documents = documents;
    }

    public Set<Notification> getNotifications() {
        return notifications;
    }

    public DocumentType notifications(Set<Notification> notifications) {
        this.notifications = notifications;
        return this;
    }

    public DocumentType addNotification(Notification notification) {
        this.notifications.add(notification);
        notification.getDocumentTypes().add(this);
        return this;
    }

    public DocumentType removeNotification(Notification notification) {
        this.notifications.remove(notification);
        notification.getDocumentTypes().remove(this);
        return this;
    }

    public void setNotifications(Set<Notification> notifications) {
        this.notifications = notifications;
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
        DocumentType documentType = (DocumentType) o;
        if (documentType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), documentType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DocumentType{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            ", level='" + getLevel() + "'" +
            "}";
    }
}
