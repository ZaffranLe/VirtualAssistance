package app.web.rest;

import app.VirtualAssistantApp;

import app.domain.CriteriaType;
import app.repository.CriteriaTypeRepository;
import app.service.CriteriaTypeService;
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
 * Test class for the CriteriaTypeResource REST controller.
 *
 * @see CriteriaTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VirtualAssistantApp.class)
public class CriteriaTypeResourceIntTest {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Integer DEFAULT_LEVEL = 1;
    private static final Integer UPDATED_LEVEL = 2;

    @Autowired
    private CriteriaTypeRepository criteriaTypeRepository;

    

    @Autowired
    private CriteriaTypeService criteriaTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCriteriaTypeMockMvc;

    private CriteriaType criteriaType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CriteriaTypeResource criteriaTypeResource = new CriteriaTypeResource(criteriaTypeService);
        this.restCriteriaTypeMockMvc = MockMvcBuilders.standaloneSetup(criteriaTypeResource)
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
    public static CriteriaType createEntity(EntityManager em) {
        CriteriaType criteriaType = new CriteriaType()
            .content(DEFAULT_CONTENT)
            .level(DEFAULT_LEVEL);
        return criteriaType;
    }

    @Before
    public void initTest() {
        criteriaType = createEntity(em);
    }

    @Test
    @Transactional
    public void createCriteriaType() throws Exception {
        int databaseSizeBeforeCreate = criteriaTypeRepository.findAll().size();

        // Create the CriteriaType
        restCriteriaTypeMockMvc.perform(post("/api/criteria-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(criteriaType)))
            .andExpect(status().isCreated());

        // Validate the CriteriaType in the database
        List<CriteriaType> criteriaTypeList = criteriaTypeRepository.findAll();
        assertThat(criteriaTypeList).hasSize(databaseSizeBeforeCreate + 1);
        CriteriaType testCriteriaType = criteriaTypeList.get(criteriaTypeList.size() - 1);
        assertThat(testCriteriaType.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testCriteriaType.getLevel()).isEqualTo(DEFAULT_LEVEL);
    }

    @Test
    @Transactional
    public void createCriteriaTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = criteriaTypeRepository.findAll().size();

        // Create the CriteriaType with an existing ID
        criteriaType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCriteriaTypeMockMvc.perform(post("/api/criteria-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(criteriaType)))
            .andExpect(status().isBadRequest());

        // Validate the CriteriaType in the database
        List<CriteriaType> criteriaTypeList = criteriaTypeRepository.findAll();
        assertThat(criteriaTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCriteriaTypes() throws Exception {
        // Initialize the database
        criteriaTypeRepository.saveAndFlush(criteriaType);

        // Get all the criteriaTypeList
        restCriteriaTypeMockMvc.perform(get("/api/criteria-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(criteriaType.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL)));
    }
    

    @Test
    @Transactional
    public void getCriteriaType() throws Exception {
        // Initialize the database
        criteriaTypeRepository.saveAndFlush(criteriaType);

        // Get the criteriaType
        restCriteriaTypeMockMvc.perform(get("/api/criteria-types/{id}", criteriaType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(criteriaType.getId().intValue()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.level").value(DEFAULT_LEVEL));
    }
    @Test
    @Transactional
    public void getNonExistingCriteriaType() throws Exception {
        // Get the criteriaType
        restCriteriaTypeMockMvc.perform(get("/api/criteria-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCriteriaType() throws Exception {
        // Initialize the database
        criteriaTypeService.save(criteriaType);

        int databaseSizeBeforeUpdate = criteriaTypeRepository.findAll().size();

        // Update the criteriaType
        CriteriaType updatedCriteriaType = criteriaTypeRepository.findById(criteriaType.getId()).get();
        // Disconnect from session so that the updates on updatedCriteriaType are not directly saved in db
        em.detach(updatedCriteriaType);
        updatedCriteriaType
            .content(UPDATED_CONTENT)
            .level(UPDATED_LEVEL);

        restCriteriaTypeMockMvc.perform(put("/api/criteria-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCriteriaType)))
            .andExpect(status().isOk());

        // Validate the CriteriaType in the database
        List<CriteriaType> criteriaTypeList = criteriaTypeRepository.findAll();
        assertThat(criteriaTypeList).hasSize(databaseSizeBeforeUpdate);
        CriteriaType testCriteriaType = criteriaTypeList.get(criteriaTypeList.size() - 1);
        assertThat(testCriteriaType.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testCriteriaType.getLevel()).isEqualTo(UPDATED_LEVEL);
    }

    @Test
    @Transactional
    public void updateNonExistingCriteriaType() throws Exception {
        int databaseSizeBeforeUpdate = criteriaTypeRepository.findAll().size();

        // Create the CriteriaType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restCriteriaTypeMockMvc.perform(put("/api/criteria-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(criteriaType)))
            .andExpect(status().isBadRequest());

        // Validate the CriteriaType in the database
        List<CriteriaType> criteriaTypeList = criteriaTypeRepository.findAll();
        assertThat(criteriaTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCriteriaType() throws Exception {
        // Initialize the database
        criteriaTypeService.save(criteriaType);

        int databaseSizeBeforeDelete = criteriaTypeRepository.findAll().size();

        // Get the criteriaType
        restCriteriaTypeMockMvc.perform(delete("/api/criteria-types/{id}", criteriaType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CriteriaType> criteriaTypeList = criteriaTypeRepository.findAll();
        assertThat(criteriaTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CriteriaType.class);
        CriteriaType criteriaType1 = new CriteriaType();
        criteriaType1.setId(1L);
        CriteriaType criteriaType2 = new CriteriaType();
        criteriaType2.setId(criteriaType1.getId());
        assertThat(criteriaType1).isEqualTo(criteriaType2);
        criteriaType2.setId(2L);
        assertThat(criteriaType1).isNotEqualTo(criteriaType2);
        criteriaType1.setId(null);
        assertThat(criteriaType1).isNotEqualTo(criteriaType2);
    }
}
