package app.web.rest;

import app.VirtualAssistantApp;

import app.domain.ProofType;
import app.repository.ProofTypeRepository;
import app.service.ProofTypeService;
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

/**
 * Test class for the ProofTypeResource REST controller.
 *
 * @see ProofTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VirtualAssistantApp.class)
public class ProofTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ProofTypeRepository proofTypeRepository;

    

    @Autowired
    private ProofTypeService proofTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProofTypeMockMvc;

    private ProofType proofType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProofTypeResource proofTypeResource = new ProofTypeResource(proofTypeService);
        this.restProofTypeMockMvc = MockMvcBuilders.standaloneSetup(proofTypeResource)
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
    public static ProofType createEntity(EntityManager em) {
        ProofType proofType = new ProofType()
            .name(DEFAULT_NAME);
        return proofType;
    }

    @Before
    public void initTest() {
        proofType = createEntity(em);
    }

    @Test
    @Transactional
    public void createProofType() throws Exception {
        int databaseSizeBeforeCreate = proofTypeRepository.findAll().size();

        // Create the ProofType
        restProofTypeMockMvc.perform(post("/api/proof-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proofType)))
            .andExpect(status().isCreated());

        // Validate the ProofType in the database
        List<ProofType> proofTypeList = proofTypeRepository.findAll();
        assertThat(proofTypeList).hasSize(databaseSizeBeforeCreate + 1);
        ProofType testProofType = proofTypeList.get(proofTypeList.size() - 1);
        assertThat(testProofType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createProofTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = proofTypeRepository.findAll().size();

        // Create the ProofType with an existing ID
        proofType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProofTypeMockMvc.perform(post("/api/proof-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proofType)))
            .andExpect(status().isBadRequest());

        // Validate the ProofType in the database
        List<ProofType> proofTypeList = proofTypeRepository.findAll();
        assertThat(proofTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProofTypes() throws Exception {
        // Initialize the database
        proofTypeRepository.saveAndFlush(proofType);

        // Get all the proofTypeList
        restProofTypeMockMvc.perform(get("/api/proof-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(proofType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getProofType() throws Exception {
        // Initialize the database
        proofTypeRepository.saveAndFlush(proofType);

        // Get the proofType
        restProofTypeMockMvc.perform(get("/api/proof-types/{id}", proofType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(proofType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingProofType() throws Exception {
        // Get the proofType
        restProofTypeMockMvc.perform(get("/api/proof-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProofType() throws Exception {
        // Initialize the database
        proofTypeService.save(proofType);

        int databaseSizeBeforeUpdate = proofTypeRepository.findAll().size();

        // Update the proofType
        ProofType updatedProofType = proofTypeRepository.findById(proofType.getId()).get();
        // Disconnect from session so that the updates on updatedProofType are not directly saved in db
        em.detach(updatedProofType);
        updatedProofType
            .name(UPDATED_NAME);

        restProofTypeMockMvc.perform(put("/api/proof-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProofType)))
            .andExpect(status().isOk());

        // Validate the ProofType in the database
        List<ProofType> proofTypeList = proofTypeRepository.findAll();
        assertThat(proofTypeList).hasSize(databaseSizeBeforeUpdate);
        ProofType testProofType = proofTypeList.get(proofTypeList.size() - 1);
        assertThat(testProofType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingProofType() throws Exception {
        int databaseSizeBeforeUpdate = proofTypeRepository.findAll().size();

        // Create the ProofType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restProofTypeMockMvc.perform(put("/api/proof-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proofType)))
            .andExpect(status().isBadRequest());

        // Validate the ProofType in the database
        List<ProofType> proofTypeList = proofTypeRepository.findAll();
        assertThat(proofTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProofType() throws Exception {
        // Initialize the database
        proofTypeService.save(proofType);

        int databaseSizeBeforeDelete = proofTypeRepository.findAll().size();

        // Get the proofType
        restProofTypeMockMvc.perform(delete("/api/proof-types/{id}", proofType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProofType> proofTypeList = proofTypeRepository.findAll();
        assertThat(proofTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProofType.class);
        ProofType proofType1 = new ProofType();
        proofType1.setId(1L);
        ProofType proofType2 = new ProofType();
        proofType2.setId(proofType1.getId());
        assertThat(proofType1).isEqualTo(proofType2);
        proofType2.setId(2L);
        assertThat(proofType1).isNotEqualTo(proofType2);
        proofType1.setId(null);
        assertThat(proofType1).isNotEqualTo(proofType2);
    }
}
