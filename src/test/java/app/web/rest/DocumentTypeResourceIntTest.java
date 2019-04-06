package app.web.rest;

import app.VirtualAssistantApp;

import app.domain.DocumentType;
import app.repository.DocumentTypeRepository;
import app.service.DocumentTypeService;
import app.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import app.domain.enumeration.Level;
/**
 * Test class for the DocumentTypeResource REST controller.
 *
 * @see DocumentTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VirtualAssistantApp.class)
public class DocumentTypeResourceIntTest {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Level DEFAULT_LEVEL = Level.LEVEL1;
    private static final Level UPDATED_LEVEL = Level.LEVEL2;

    @Autowired
    private DocumentTypeRepository documentTypeRepository;

    

    @Autowired
    private DocumentTypeService documentTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDocumentTypeMockMvc;

    private DocumentType documentType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DocumentTypeResource documentTypeResource = new DocumentTypeResource(documentTypeService);
        this.restDocumentTypeMockMvc = MockMvcBuilders.standaloneSetup(documentTypeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocumentType createEntity(EntityManager em) {
        DocumentType documentType = new DocumentType()
            .content(DEFAULT_CONTENT)
            .level(DEFAULT_LEVEL);
        return documentType;
    }

    @Before
    public void initTest() {
        documentType = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocumentType() throws Exception {
        int databaseSizeBeforeCreate = documentTypeRepository.findAll().size();

        // Create the DocumentType
        restDocumentTypeMockMvc.perform(post("/api/document-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentType)))
            .andExpect(status().isCreated());

        // Validate the DocumentType in the database
        List<DocumentType> documentTypeList = documentTypeRepository.findAll();
        assertThat(documentTypeList).hasSize(databaseSizeBeforeCreate + 1);
        DocumentType testDocumentType = documentTypeList.get(documentTypeList.size() - 1);
        assertThat(testDocumentType.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testDocumentType.getLevel()).isEqualTo(DEFAULT_LEVEL);
    }

    @Test
    @Transactional
    public void createDocumentTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = documentTypeRepository.findAll().size();

        // Create the DocumentType with an existing ID
        documentType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentTypeMockMvc.perform(post("/api/document-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentType)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentType in the database
        List<DocumentType> documentTypeList = documentTypeRepository.findAll();
        assertThat(documentTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDocumentTypes() throws Exception {
        // Initialize the database
        documentTypeRepository.saveAndFlush(documentType);

        // Get all the documentTypeList
        restDocumentTypeMockMvc.perform(get("/api/document-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentType.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL.toString())));
    }
    

    @Test
    @Transactional
    public void getDocumentType() throws Exception {
        // Initialize the database
        documentTypeRepository.saveAndFlush(documentType);

        // Get the documentType
        restDocumentTypeMockMvc.perform(get("/api/document-types/{id}", documentType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(documentType.getId().intValue()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.level").value(DEFAULT_LEVEL.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingDocumentType() throws Exception {
        // Get the documentType
        restDocumentTypeMockMvc.perform(get("/api/document-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocumentType() throws Exception {
        // Initialize the database
        documentTypeService.save(documentType);

        int databaseSizeBeforeUpdate = documentTypeRepository.findAll().size();

        // Update the documentType
        DocumentType updatedDocumentType = documentTypeRepository.findById(documentType.getId()).get();
        // Disconnect from session so that the updates on updatedDocumentType are not directly saved in db
        em.detach(updatedDocumentType);
        updatedDocumentType
            .content(UPDATED_CONTENT)
            .level(UPDATED_LEVEL);

        restDocumentTypeMockMvc.perform(put("/api/document-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDocumentType)))
            .andExpect(status().isOk());

        // Validate the DocumentType in the database
        List<DocumentType> documentTypeList = documentTypeRepository.findAll();
        assertThat(documentTypeList).hasSize(databaseSizeBeforeUpdate);
        DocumentType testDocumentType = documentTypeList.get(documentTypeList.size() - 1);
        assertThat(testDocumentType.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testDocumentType.getLevel()).isEqualTo(UPDATED_LEVEL);
    }

    @Test
    @Transactional
    public void updateNonExistingDocumentType() throws Exception {
        int databaseSizeBeforeUpdate = documentTypeRepository.findAll().size();

        // Create the DocumentType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restDocumentTypeMockMvc.perform(put("/api/document-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(documentType)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentType in the database
        List<DocumentType> documentTypeList = documentTypeRepository.findAll();
        assertThat(documentTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDocumentType() throws Exception {
        // Initialize the database
        documentTypeService.save(documentType);

        int databaseSizeBeforeDelete = documentTypeRepository.findAll().size();

        // Get the documentType
        restDocumentTypeMockMvc.perform(delete("/api/document-types/{id}", documentType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DocumentType> documentTypeList = documentTypeRepository.findAll();
        assertThat(documentTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentType.class);
        DocumentType documentType1 = new DocumentType();
        documentType1.setId(1L);
        DocumentType documentType2 = new DocumentType();
        documentType2.setId(documentType1.getId());
        assertThat(documentType1).isEqualTo(documentType2);
        documentType2.setId(2L);
        assertThat(documentType1).isNotEqualTo(documentType2);
        documentType1.setId(null);
        assertThat(documentType1).isNotEqualTo(documentType2);
    }
}
