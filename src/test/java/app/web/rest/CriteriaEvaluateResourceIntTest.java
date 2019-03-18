package app.web.rest;

import app.VirtualAssistantApp;

import app.domain.CriteriaEvaluate;
import app.repository.CriteriaEvaluateRepository;
import app.service.CriteriaEvaluateService;
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
 * Test class for the CriteriaEvaluateResource REST controller.
 *
 * @see CriteriaEvaluateResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VirtualAssistantApp.class)
public class CriteriaEvaluateResourceIntTest {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Integer DEFAULT_LEVEL = 1;
    private static final Integer UPDATED_LEVEL = 2;

    private static final String DEFAULT_PASS = "AAAAAAAAAA";
    private static final String UPDATED_PASS = "BBBBBBBBBB";

    private static final String DEFAULT_GOOD = "AAAAAAAAAA";
    private static final String UPDATED_GOOD = "BBBBBBBBBB";

    private static final String DEFAULT_EXCELLENT = "AAAAAAAAAA";
    private static final String UPDATED_EXCELLENT = "BBBBBBBBBB";

    @Autowired
    private CriteriaEvaluateRepository criteriaEvaluateRepository;

    

    @Autowired
    private CriteriaEvaluateService criteriaEvaluateService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCriteriaEvaluateMockMvc;

    private CriteriaEvaluate criteriaEvaluate;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CriteriaEvaluateResource criteriaEvaluateResource = new CriteriaEvaluateResource(criteriaEvaluateService);
        this.restCriteriaEvaluateMockMvc = MockMvcBuilders.standaloneSetup(criteriaEvaluateResource)
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
    public static CriteriaEvaluate createEntity(EntityManager em) {
        CriteriaEvaluate criteriaEvaluate = new CriteriaEvaluate()
            .content(DEFAULT_CONTENT)
            .level(DEFAULT_LEVEL)
            .pass(DEFAULT_PASS)
            .good(DEFAULT_GOOD)
            .excellent(DEFAULT_EXCELLENT);
        return criteriaEvaluate;
    }

    @Before
    public void initTest() {
        criteriaEvaluate = createEntity(em);
    }

    @Test
    @Transactional
    public void createCriteriaEvaluate() throws Exception {
        int databaseSizeBeforeCreate = criteriaEvaluateRepository.findAll().size();

        // Create the CriteriaEvaluate
        restCriteriaEvaluateMockMvc.perform(post("/api/criteria-evaluates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(criteriaEvaluate)))
            .andExpect(status().isCreated());

        // Validate the CriteriaEvaluate in the database
        List<CriteriaEvaluate> criteriaEvaluateList = criteriaEvaluateRepository.findAll();
        assertThat(criteriaEvaluateList).hasSize(databaseSizeBeforeCreate + 1);
        CriteriaEvaluate testCriteriaEvaluate = criteriaEvaluateList.get(criteriaEvaluateList.size() - 1);
        assertThat(testCriteriaEvaluate.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testCriteriaEvaluate.getLevel()).isEqualTo(DEFAULT_LEVEL);
        assertThat(testCriteriaEvaluate.getPass()).isEqualTo(DEFAULT_PASS);
        assertThat(testCriteriaEvaluate.getGood()).isEqualTo(DEFAULT_GOOD);
        assertThat(testCriteriaEvaluate.getExcellent()).isEqualTo(DEFAULT_EXCELLENT);
    }

    @Test
    @Transactional
    public void createCriteriaEvaluateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = criteriaEvaluateRepository.findAll().size();

        // Create the CriteriaEvaluate with an existing ID
        criteriaEvaluate.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCriteriaEvaluateMockMvc.perform(post("/api/criteria-evaluates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(criteriaEvaluate)))
            .andExpect(status().isBadRequest());

        // Validate the CriteriaEvaluate in the database
        List<CriteriaEvaluate> criteriaEvaluateList = criteriaEvaluateRepository.findAll();
        assertThat(criteriaEvaluateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCriteriaEvaluates() throws Exception {
        // Initialize the database
        criteriaEvaluateRepository.saveAndFlush(criteriaEvaluate);

        // Get all the criteriaEvaluateList
        restCriteriaEvaluateMockMvc.perform(get("/api/criteria-evaluates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(criteriaEvaluate.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL)))
            .andExpect(jsonPath("$.[*].pass").value(hasItem(DEFAULT_PASS.toString())))
            .andExpect(jsonPath("$.[*].good").value(hasItem(DEFAULT_GOOD.toString())))
            .andExpect(jsonPath("$.[*].excellent").value(hasItem(DEFAULT_EXCELLENT.toString())));
    }
    

    @Test
    @Transactional
    public void getCriteriaEvaluate() throws Exception {
        // Initialize the database
        criteriaEvaluateRepository.saveAndFlush(criteriaEvaluate);

        // Get the criteriaEvaluate
        restCriteriaEvaluateMockMvc.perform(get("/api/criteria-evaluates/{id}", criteriaEvaluate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(criteriaEvaluate.getId().intValue()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.level").value(DEFAULT_LEVEL))
            .andExpect(jsonPath("$.pass").value(DEFAULT_PASS.toString()))
            .andExpect(jsonPath("$.good").value(DEFAULT_GOOD.toString()))
            .andExpect(jsonPath("$.excellent").value(DEFAULT_EXCELLENT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCriteriaEvaluate() throws Exception {
        // Get the criteriaEvaluate
        restCriteriaEvaluateMockMvc.perform(get("/api/criteria-evaluates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCriteriaEvaluate() throws Exception {
        // Initialize the database
        criteriaEvaluateService.save(criteriaEvaluate);

        int databaseSizeBeforeUpdate = criteriaEvaluateRepository.findAll().size();

        // Update the criteriaEvaluate
        CriteriaEvaluate updatedCriteriaEvaluate = criteriaEvaluateRepository.findById(criteriaEvaluate.getId()).get();
        // Disconnect from session so that the updates on updatedCriteriaEvaluate are not directly saved in db
        em.detach(updatedCriteriaEvaluate);
        updatedCriteriaEvaluate
            .content(UPDATED_CONTENT)
            .level(UPDATED_LEVEL)
            .pass(UPDATED_PASS)
            .good(UPDATED_GOOD)
            .excellent(UPDATED_EXCELLENT);

        restCriteriaEvaluateMockMvc.perform(put("/api/criteria-evaluates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCriteriaEvaluate)))
            .andExpect(status().isOk());

        // Validate the CriteriaEvaluate in the database
        List<CriteriaEvaluate> criteriaEvaluateList = criteriaEvaluateRepository.findAll();
        assertThat(criteriaEvaluateList).hasSize(databaseSizeBeforeUpdate);
        CriteriaEvaluate testCriteriaEvaluate = criteriaEvaluateList.get(criteriaEvaluateList.size() - 1);
        assertThat(testCriteriaEvaluate.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testCriteriaEvaluate.getLevel()).isEqualTo(UPDATED_LEVEL);
        assertThat(testCriteriaEvaluate.getPass()).isEqualTo(UPDATED_PASS);
        assertThat(testCriteriaEvaluate.getGood()).isEqualTo(UPDATED_GOOD);
        assertThat(testCriteriaEvaluate.getExcellent()).isEqualTo(UPDATED_EXCELLENT);
    }

    @Test
    @Transactional
    public void updateNonExistingCriteriaEvaluate() throws Exception {
        int databaseSizeBeforeUpdate = criteriaEvaluateRepository.findAll().size();

        // Create the CriteriaEvaluate

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restCriteriaEvaluateMockMvc.perform(put("/api/criteria-evaluates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(criteriaEvaluate)))
            .andExpect(status().isBadRequest());

        // Validate the CriteriaEvaluate in the database
        List<CriteriaEvaluate> criteriaEvaluateList = criteriaEvaluateRepository.findAll();
        assertThat(criteriaEvaluateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCriteriaEvaluate() throws Exception {
        // Initialize the database
        criteriaEvaluateService.save(criteriaEvaluate);

        int databaseSizeBeforeDelete = criteriaEvaluateRepository.findAll().size();

        // Get the criteriaEvaluate
        restCriteriaEvaluateMockMvc.perform(delete("/api/criteria-evaluates/{id}", criteriaEvaluate.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CriteriaEvaluate> criteriaEvaluateList = criteriaEvaluateRepository.findAll();
        assertThat(criteriaEvaluateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CriteriaEvaluate.class);
        CriteriaEvaluate criteriaEvaluate1 = new CriteriaEvaluate();
        criteriaEvaluate1.setId(1L);
        CriteriaEvaluate criteriaEvaluate2 = new CriteriaEvaluate();
        criteriaEvaluate2.setId(criteriaEvaluate1.getId());
        assertThat(criteriaEvaluate1).isEqualTo(criteriaEvaluate2);
        criteriaEvaluate2.setId(2L);
        assertThat(criteriaEvaluate1).isNotEqualTo(criteriaEvaluate2);
        criteriaEvaluate1.setId(null);
        assertThat(criteriaEvaluate1).isNotEqualTo(criteriaEvaluate2);
    }
}
