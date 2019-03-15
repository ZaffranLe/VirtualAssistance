package app.web.rest;

import app.VirtualAssistantApp;

import app.domain.CritetiaEvaluate;
import app.repository.CritetiaEvaluateRepository;
import app.service.CritetiaEvaluateService;
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
 * Test class for the CritetiaEvaluateResource REST controller.
 *
 * @see CritetiaEvaluateResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VirtualAssistantApp.class)
public class CritetiaEvaluateResourceIntTest {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Integer DEFAULT_LEVEL = 1;
    private static final Integer UPDATED_LEVEL = 2;

    @Autowired
    private CritetiaEvaluateRepository critetiaEvaluateRepository;

    

    @Autowired
    private CritetiaEvaluateService critetiaEvaluateService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCritetiaEvaluateMockMvc;

    private CritetiaEvaluate critetiaEvaluate;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CritetiaEvaluateResource critetiaEvaluateResource = new CritetiaEvaluateResource(critetiaEvaluateService);
        this.restCritetiaEvaluateMockMvc = MockMvcBuilders.standaloneSetup(critetiaEvaluateResource)
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
    public static CritetiaEvaluate createEntity(EntityManager em) {
        CritetiaEvaluate critetiaEvaluate = new CritetiaEvaluate()
            .content(DEFAULT_CONTENT)
            .level(DEFAULT_LEVEL);
        return critetiaEvaluate;
    }

    @Before
    public void initTest() {
        critetiaEvaluate = createEntity(em);
    }

    @Test
    @Transactional
    public void createCritetiaEvaluate() throws Exception {
        int databaseSizeBeforeCreate = critetiaEvaluateRepository.findAll().size();

        // Create the CritetiaEvaluate
        restCritetiaEvaluateMockMvc.perform(post("/api/critetia-evaluates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(critetiaEvaluate)))
            .andExpect(status().isCreated());

        // Validate the CritetiaEvaluate in the database
        List<CritetiaEvaluate> critetiaEvaluateList = critetiaEvaluateRepository.findAll();
        assertThat(critetiaEvaluateList).hasSize(databaseSizeBeforeCreate + 1);
        CritetiaEvaluate testCritetiaEvaluate = critetiaEvaluateList.get(critetiaEvaluateList.size() - 1);
        assertThat(testCritetiaEvaluate.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testCritetiaEvaluate.getLevel()).isEqualTo(DEFAULT_LEVEL);
    }

    @Test
    @Transactional
    public void createCritetiaEvaluateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = critetiaEvaluateRepository.findAll().size();

        // Create the CritetiaEvaluate with an existing ID
        critetiaEvaluate.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCritetiaEvaluateMockMvc.perform(post("/api/critetia-evaluates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(critetiaEvaluate)))
            .andExpect(status().isBadRequest());

        // Validate the CritetiaEvaluate in the database
        List<CritetiaEvaluate> critetiaEvaluateList = critetiaEvaluateRepository.findAll();
        assertThat(critetiaEvaluateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCritetiaEvaluates() throws Exception {
        // Initialize the database
        critetiaEvaluateRepository.saveAndFlush(critetiaEvaluate);

        // Get all the critetiaEvaluateList
        restCritetiaEvaluateMockMvc.perform(get("/api/critetia-evaluates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(critetiaEvaluate.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].level").value(hasItem(DEFAULT_LEVEL)));
    }
    

    @Test
    @Transactional
    public void getCritetiaEvaluate() throws Exception {
        // Initialize the database
        critetiaEvaluateRepository.saveAndFlush(critetiaEvaluate);

        // Get the critetiaEvaluate
        restCritetiaEvaluateMockMvc.perform(get("/api/critetia-evaluates/{id}", critetiaEvaluate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(critetiaEvaluate.getId().intValue()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.level").value(DEFAULT_LEVEL));
    }
    @Test
    @Transactional
    public void getNonExistingCritetiaEvaluate() throws Exception {
        // Get the critetiaEvaluate
        restCritetiaEvaluateMockMvc.perform(get("/api/critetia-evaluates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCritetiaEvaluate() throws Exception {
        // Initialize the database
        critetiaEvaluateService.save(critetiaEvaluate);

        int databaseSizeBeforeUpdate = critetiaEvaluateRepository.findAll().size();

        // Update the critetiaEvaluate
        CritetiaEvaluate updatedCritetiaEvaluate = critetiaEvaluateRepository.findById(critetiaEvaluate.getId()).get();
        // Disconnect from session so that the updates on updatedCritetiaEvaluate are not directly saved in db
        em.detach(updatedCritetiaEvaluate);
        updatedCritetiaEvaluate
            .content(UPDATED_CONTENT)
            .level(UPDATED_LEVEL);

        restCritetiaEvaluateMockMvc.perform(put("/api/critetia-evaluates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCritetiaEvaluate)))
            .andExpect(status().isOk());

        // Validate the CritetiaEvaluate in the database
        List<CritetiaEvaluate> critetiaEvaluateList = critetiaEvaluateRepository.findAll();
        assertThat(critetiaEvaluateList).hasSize(databaseSizeBeforeUpdate);
        CritetiaEvaluate testCritetiaEvaluate = critetiaEvaluateList.get(critetiaEvaluateList.size() - 1);
        assertThat(testCritetiaEvaluate.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testCritetiaEvaluate.getLevel()).isEqualTo(UPDATED_LEVEL);
    }

    @Test
    @Transactional
    public void updateNonExistingCritetiaEvaluate() throws Exception {
        int databaseSizeBeforeUpdate = critetiaEvaluateRepository.findAll().size();

        // Create the CritetiaEvaluate

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restCritetiaEvaluateMockMvc.perform(put("/api/critetia-evaluates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(critetiaEvaluate)))
            .andExpect(status().isBadRequest());

        // Validate the CritetiaEvaluate in the database
        List<CritetiaEvaluate> critetiaEvaluateList = critetiaEvaluateRepository.findAll();
        assertThat(critetiaEvaluateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCritetiaEvaluate() throws Exception {
        // Initialize the database
        critetiaEvaluateService.save(critetiaEvaluate);

        int databaseSizeBeforeDelete = critetiaEvaluateRepository.findAll().size();

        // Get the critetiaEvaluate
        restCritetiaEvaluateMockMvc.perform(delete("/api/critetia-evaluates/{id}", critetiaEvaluate.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CritetiaEvaluate> critetiaEvaluateList = critetiaEvaluateRepository.findAll();
        assertThat(critetiaEvaluateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CritetiaEvaluate.class);
        CritetiaEvaluate critetiaEvaluate1 = new CritetiaEvaluate();
        critetiaEvaluate1.setId(1L);
        CritetiaEvaluate critetiaEvaluate2 = new CritetiaEvaluate();
        critetiaEvaluate2.setId(critetiaEvaluate1.getId());
        assertThat(critetiaEvaluate1).isEqualTo(critetiaEvaluate2);
        critetiaEvaluate2.setId(2L);
        assertThat(critetiaEvaluate1).isNotEqualTo(critetiaEvaluate2);
        critetiaEvaluate1.setId(null);
        assertThat(critetiaEvaluate1).isNotEqualTo(critetiaEvaluate2);
    }
}
