package app.web.rest;

import app.VirtualAssistantApp;

import app.domain.TeacherDocument;
import app.repository.TeacherDocumentRepository;
import app.service.TeacherDocumentService;
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

import app.domain.enumeration.Role;
/**
 * Test class for the TeacherDocumentResource REST controller.
 *
 * @see TeacherDocumentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VirtualAssistantApp.class)
public class TeacherDocumentResourceIntTest {

    private static final Role DEFAULT_ROLE = Role.OWNER;
    private static final Role UPDATED_ROLE = Role.SHARED;

    @Autowired
    private TeacherDocumentRepository teacherDocumentRepository;

    

    @Autowired
    private TeacherDocumentService teacherDocumentService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTeacherDocumentMockMvc;

    private TeacherDocument teacherDocument;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TeacherDocumentResource teacherDocumentResource = new TeacherDocumentResource(teacherDocumentService);
        this.restTeacherDocumentMockMvc = MockMvcBuilders.standaloneSetup(teacherDocumentResource)
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
    public static TeacherDocument createEntity(EntityManager em) {
        TeacherDocument teacherDocument = new TeacherDocument()
            .role(DEFAULT_ROLE);
        return teacherDocument;
    }

    @Before
    public void initTest() {
        teacherDocument = createEntity(em);
    }

    @Test
    @Transactional
    public void createTeacherDocument() throws Exception {
        int databaseSizeBeforeCreate = teacherDocumentRepository.findAll().size();

        // Create the TeacherDocument
        restTeacherDocumentMockMvc.perform(post("/api/teacher-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teacherDocument)))
            .andExpect(status().isCreated());

        // Validate the TeacherDocument in the database
        List<TeacherDocument> teacherDocumentList = teacherDocumentRepository.findAll();
        assertThat(teacherDocumentList).hasSize(databaseSizeBeforeCreate + 1);
        TeacherDocument testTeacherDocument = teacherDocumentList.get(teacherDocumentList.size() - 1);
        assertThat(testTeacherDocument.getRole()).isEqualTo(DEFAULT_ROLE);
    }

    @Test
    @Transactional
    public void createTeacherDocumentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = teacherDocumentRepository.findAll().size();

        // Create the TeacherDocument with an existing ID
        teacherDocument.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTeacherDocumentMockMvc.perform(post("/api/teacher-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teacherDocument)))
            .andExpect(status().isBadRequest());

        // Validate the TeacherDocument in the database
        List<TeacherDocument> teacherDocumentList = teacherDocumentRepository.findAll();
        assertThat(teacherDocumentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTeacherDocuments() throws Exception {
        // Initialize the database
        teacherDocumentRepository.saveAndFlush(teacherDocument);

        // Get all the teacherDocumentList
        restTeacherDocumentMockMvc.perform(get("/api/teacher-documents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teacherDocument.getId().intValue())))
            .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE.toString())));
    }
    

    @Test
    @Transactional
    public void getTeacherDocument() throws Exception {
        // Initialize the database
        teacherDocumentRepository.saveAndFlush(teacherDocument);

        // Get the teacherDocument
        restTeacherDocumentMockMvc.perform(get("/api/teacher-documents/{id}", teacherDocument.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(teacherDocument.getId().intValue()))
            .andExpect(jsonPath("$.role").value(DEFAULT_ROLE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingTeacherDocument() throws Exception {
        // Get the teacherDocument
        restTeacherDocumentMockMvc.perform(get("/api/teacher-documents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTeacherDocument() throws Exception {
        // Initialize the database
        teacherDocumentService.save(teacherDocument);

        int databaseSizeBeforeUpdate = teacherDocumentRepository.findAll().size();

        // Update the teacherDocument
        TeacherDocument updatedTeacherDocument = teacherDocumentRepository.findById(teacherDocument.getId()).get();
        // Disconnect from session so that the updates on updatedTeacherDocument are not directly saved in db
        em.detach(updatedTeacherDocument);
        updatedTeacherDocument
            .role(UPDATED_ROLE);

        restTeacherDocumentMockMvc.perform(put("/api/teacher-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTeacherDocument)))
            .andExpect(status().isOk());

        // Validate the TeacherDocument in the database
        List<TeacherDocument> teacherDocumentList = teacherDocumentRepository.findAll();
        assertThat(teacherDocumentList).hasSize(databaseSizeBeforeUpdate);
        TeacherDocument testTeacherDocument = teacherDocumentList.get(teacherDocumentList.size() - 1);
        assertThat(testTeacherDocument.getRole()).isEqualTo(UPDATED_ROLE);
    }

    @Test
    @Transactional
    public void updateNonExistingTeacherDocument() throws Exception {
        int databaseSizeBeforeUpdate = teacherDocumentRepository.findAll().size();

        // Create the TeacherDocument

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restTeacherDocumentMockMvc.perform(put("/api/teacher-documents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(teacherDocument)))
            .andExpect(status().isBadRequest());

        // Validate the TeacherDocument in the database
        List<TeacherDocument> teacherDocumentList = teacherDocumentRepository.findAll();
        assertThat(teacherDocumentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTeacherDocument() throws Exception {
        // Initialize the database
        teacherDocumentService.save(teacherDocument);

        int databaseSizeBeforeDelete = teacherDocumentRepository.findAll().size();

        // Get the teacherDocument
        restTeacherDocumentMockMvc.perform(delete("/api/teacher-documents/{id}", teacherDocument.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TeacherDocument> teacherDocumentList = teacherDocumentRepository.findAll();
        assertThat(teacherDocumentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TeacherDocument.class);
        TeacherDocument teacherDocument1 = new TeacherDocument();
        teacherDocument1.setId(1L);
        TeacherDocument teacherDocument2 = new TeacherDocument();
        teacherDocument2.setId(teacherDocument1.getId());
        assertThat(teacherDocument1).isEqualTo(teacherDocument2);
        teacherDocument2.setId(2L);
        assertThat(teacherDocument1).isNotEqualTo(teacherDocument2);
        teacherDocument1.setId(null);
        assertThat(teacherDocument1).isNotEqualTo(teacherDocument2);
    }
}
