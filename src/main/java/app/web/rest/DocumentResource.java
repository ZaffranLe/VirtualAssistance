package app.web.rest;

import app.domain.Document;
import app.domain.TeacherDocument;
import app.domain.User;
import app.domain.enumeration.Role;
import app.repository.UserRepository;
import app.web.rest.payload.*;
import app.security.SecurityUtils;
import app.service.DocumentService;
import app.service.TeacherService;
import app.service.UserService;
import app.web.rest.errors.BadRequestAlertException;
import app.web.rest.errors.InternalServerErrorException;
import app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Document.
 */
@RestController
@RequestMapping("/api")
public class DocumentResource {

    private final Logger log = LoggerFactory.getLogger(DocumentResource.class);

    private static final String ENTITY_NAME = "document";

    private final DocumentService documentService;

    public static final String AUTHORITIES_KEY = "user";
    public static final String FILE_KEY = "file";
    public static final String secretKey = "authendoc";

    public static final String USER_KEY = "user_owner";

    @Autowired
    private UserService userService;
    // private final Base64.Encoder encoder = Base64.getEncoder();

    public DocumentResource(DocumentService documentService) {
        this.documentService = documentService;
    }

    /**
     * POST /documents : Create a new document.
     *
     * @param document the document to create
     * @return the ResponseEntity with status 201 (Created) and with body the new
     *         document, or with status 400 (Bad Request) if the document has
     *         already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/documents")
    public ResponseEntity<Document> createDocument(@RequestBody Document document) throws URISyntaxException {
        log.debug("REST request to save Document : {}", document);
        if (document.getId() != null) {
            throw new BadRequestAlertException("A new document cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Document result = documentService.save(document);
        return ResponseEntity.created(new URI("/api/documents/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT /documents : Updates an existing document.
     *
     * @param document the document to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     *         document, or with status 400 (Bad Request) if the document is not
     *         valid, or with status 500 (Internal Server Error) if the document
     *         couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/documents")
    public ResponseEntity<Document> updateDocument(@RequestBody Document document) throws URISyntaxException {
        log.debug("REST request to update Document : {}", document);
        if (document.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Document result = documentService.save(document);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, document.getId().toString()))
                .body(result);
    }

    /**
     * GET /documents : get all the documents.
     *
     * @param eagerload flag to eager load entities from relationships (This is
     *                  applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of documents in
     *         body
     */
    @GetMapping("/documents")
    public List<Document> getAllDocuments(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Documents");
        return documentService.findAll();
    }

    /**
     * GET /documents/:id : get the "id" document.
     *
     * @param id the id of the document to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the document,
     *         or with status 404 (Not Found)
     */
    @GetMapping("/documents/{id}")
    public ResponseEntity<DocumentDTO> getDocument(@PathVariable Long id) {
        log.debug("REST request to get Document : {}", id);
        Optional<Document> document = documentService.findOne(id);
        // Document doc = document.orElseThrow(new
        // InternalServerErrorException("Document not found"));
        Document doc = document.get();
        DocumentDTO docdto = new DocumentDTO();
        // document.of(value);
        docdto.setDoc(doc);
        String userLogin = SecurityUtils.getCurrentUserLogin().get();
        log.debug("user login {}", userLogin);
        // log.debug("teacersss {}", doc.getDocuments().size());
        TeacherDocument teacherDocument = doc.getDocuments().stream()
        .filter(t -> t.getRole() == Role.OWNER).findFirst().orElseThrow(()-> new InternalServerErrorException("Khong thay tac gia"));;
        User user =    userService.findOneByTeacher(teacherDocument.getTeacher().getId()).orElseThrow(()-> new InternalServerErrorException("Khong thay user tac gia"));
        Date validity = new Date(new Date().getTime() + 3600 * 500);

        String headerValue = Jwts.builder().setSubject(doc.getId().toString())
                .claim(AUTHORITIES_KEY, userLogin)
                .claim(USER_KEY, user.getLogin())
                .claim(FILE_KEY, doc.getuRL())
                .signWith(SignatureAlgorithm.HS512, secretKey).setExpiration(validity)
                .compact();
        docdto.setAuthenkey(headerValue);
        // ResponseUtil.wrapOrNotFound(maybeResponse, header)
        HttpHeaders https = new HttpHeaders();
        https.add("authendoc", headerValue);
        https.set("authendoc", headerValue);
        return ResponseUtil.wrapOrNotFound(document.of(docdto), https);

    }

    /**
     * DELETE /documents/:id : delete the "id" document.
     *
     * @param id the id of the document to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/documents/{id}")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long id) {
        log.debug("REST request to delete Document : {}", id);
        documentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/documents-private")
    public List<Document> getAllDocumentsOfCurrentAccount(
            @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Documents");
        return documentService.findByCurrentAccount();
    }

    @GetMapping("/documents-public")
    public List<Document> getAllDocumentsPublic(
            @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Documents");
        return documentService.finAllPublic();
    }
}