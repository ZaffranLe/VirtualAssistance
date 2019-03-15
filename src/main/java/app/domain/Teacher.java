package app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import app.domain.enumeration.TeacherLevel;

import app.domain.enumeration.Status;

/**
 * A Teacher.
 */
@Entity
@Table(name = "teacher")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Teacher implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "identity_number")
    private String identityNumber;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "do_b")
    private ZonedDateTime doB;

    @Column(name = "address")
    private String address;

    @Column(name = "email")
    private String email;

    @Column(name = "jhi_password")
    private String password;

    @Column(name = "data_storage")
    private Integer dataStorage;

    @Column(name = "used_storage")
    private Integer usedStorage;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_level")
    private TeacherLevel level;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "avatar")
    private String avatar;

    @OneToMany(mappedBy = "teacher")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TeacherDocument> teachers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentityNumber() {
        return identityNumber;
    }

    public Teacher identityNumber(String identityNumber) {
        this.identityNumber = identityNumber;
        return this;
    }

    public void setIdentityNumber(String identityNumber) {
        this.identityNumber = identityNumber;
    }

    public String getFullName() {
        return fullName;
    }

    public Teacher fullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhone() {
        return phone;
    }

    public Teacher phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public ZonedDateTime getDoB() {
        return doB;
    }

    public Teacher doB(ZonedDateTime doB) {
        this.doB = doB;
        return this;
    }

    public void setDoB(ZonedDateTime doB) {
        this.doB = doB;
    }

    public String getAddress() {
        return address;
    }

    public Teacher address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public Teacher email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public Teacher password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getDataStorage() {
        return dataStorage;
    }

    public Teacher dataStorage(Integer dataStorage) {
        this.dataStorage = dataStorage;
        return this;
    }

    public void setDataStorage(Integer dataStorage) {
        this.dataStorage = dataStorage;
    }

    public Integer getUsedStorage() {
        return usedStorage;
    }

    public Teacher usedStorage(Integer usedStorage) {
        this.usedStorage = usedStorage;
        return this;
    }

    public void setUsedStorage(Integer usedStorage) {
        this.usedStorage = usedStorage;
    }

    public TeacherLevel getLevel() {
        return level;
    }

    public Teacher level(TeacherLevel level) {
        this.level = level;
        return this;
    }

    public void setLevel(TeacherLevel level) {
        this.level = level;
    }

    public Status getStatus() {
        return status;
    }

    public Teacher status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getAvatar() {
        return avatar;
    }

    public Teacher avatar(String avatar) {
        this.avatar = avatar;
        return this;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Set<TeacherDocument> getTeachers() {
        return teachers;
    }

    public Teacher teachers(Set<TeacherDocument> teacherDocuments) {
        this.teachers = teacherDocuments;
        return this;
    }

    public Teacher addTeacher(TeacherDocument teacherDocument) {
        this.teachers.add(teacherDocument);
        teacherDocument.setTeacher(this);
        return this;
    }

    public Teacher removeTeacher(TeacherDocument teacherDocument) {
        this.teachers.remove(teacherDocument);
        teacherDocument.setTeacher(null);
        return this;
    }

    public void setTeachers(Set<TeacherDocument> teacherDocuments) {
        this.teachers = teacherDocuments;
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
        Teacher teacher = (Teacher) o;
        if (teacher.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), teacher.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Teacher{" +
            "id=" + getId() +
            ", identityNumber='" + getIdentityNumber() + "'" +
            ", fullName='" + getFullName() + "'" +
            ", phone='" + getPhone() + "'" +
            ", doB='" + getDoB() + "'" +
            ", address='" + getAddress() + "'" +
            ", email='" + getEmail() + "'" +
            ", password='" + getPassword() + "'" +
            ", dataStorage=" + getDataStorage() +
            ", usedStorage=" + getUsedStorage() +
            ", level='" + getLevel() + "'" +
            ", status='" + getStatus() + "'" +
            ", avatar='" + getAvatar() + "'" +
            "}";
    }
}
