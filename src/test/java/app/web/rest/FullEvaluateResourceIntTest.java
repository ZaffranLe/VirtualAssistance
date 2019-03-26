package app.web.rest;

import app.VirtualAssistantApp;

import app.domain.FullEvaluate;
import app.repository.FullEvaluateRepository;
import app.service.FullEvaluateService;
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

import app.domain.enumeration.ScoreLadder;
/**
 * Test class for the FullEvaluateResource REST controller.
 *
 * @see FullEvaluateResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VirtualAssistantApp.class)
public class FullEvaluateResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final ScoreLadder DEFAULT_RESULT = ScoreLadder.FAIL;
    private static final ScoreLadder UPDATED_RESULT = ScoreLadder.PASS;

    @Autowired
    private FullEvaluateRepository fullEvaluateRepository;

    

    @Autowired
    private FullEvaluateService fullEvaluateService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFullEvaluateMockMvc;

    private FullEvaluate fullEvaluate;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FullEvaluateResource fullEvaluateResource = new FullEvaluateResource(fullEvaluateService);
        this.restFullEvaluateMockMvc = MockMvcBuilders.standaloneSetup(fullEvaluateResource)
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
    public static FullEvaluate createEntity(EntityManager em) {
        FullEvaluate fullEvaluate = new FullEvaluate()
            .description(DEFAULT_DESCRIPTION)
            .result(DEFAULT_RESULT);
        return fullEvaluate;
    }

    @Before
    public void initTest() {
        fullEvaluate = createEntity(em);
    }

    @Test
    @Transactional
    public void createFullEvaluate() throws Exception {
        int databaseSizeBeforeCreate = fullEvaluateRepository.findAll().size();

        // Create the FullEvaluate
        restFullEvaluateMockMvc.perform(post("/api/full-evaluates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fullEvaluate)))
            .andExpect(status().isCreated());

        // Validate the FullEvaluate in the database
        List<FullEvaluate> fullEvaluateList = fullEvaluateRepository.findAll();
        assertThat(fullEvaluateList).hasSize(databaseSizeBeforeCreate + 1);
        FullEvaluate testFullEvaluate = fullEvaluateList.get(fullEvaluateList.size() - 1);
        assertThat(testFullEvaluate.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testFullEvaluate.getResult()).isEqualTo(DEFAULT_RESULT);
    }

    @Test
    @Transactional
    public void createFullEvaluateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fullEvaluateRepository.findAll().size();

        // Create the FullEvaluate with an existing ID
        fullEvaluate.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFullEvaluateMockMvc.perform(post("/api/full-evaluates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fullEvaluate)))
            .andExpect(status().isBadRequest());

        // Validate the FullEvaluate in the database
        List<FullEvaluate> fullEvaluateList = fullEvaluateRepository.findAll();
        assertThat(fullEvaluateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFullEvaluates() throws Exception {
        // Initialize the database
        fullEvaluateRepository.saveAndFlush(fullEvaluate);

        // Get all the fullEvaluateList
        restFullEvaluateMockMvc.perform(get("/api/full-evaluates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fullEvaluate.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].result").value(hasItem(DEFAULT_RESULT.toString())));
    }
    

    @Test
    @Transactional
    public void getFullEvaluate() throws Exception {
        // Initialize the database
        fullEvaluateRepository.saveAndFlush(fullEvaluate);

        // Get the fullEvaluate
        restFullEvaluateMockMvc.perform(get("/api/full-evaluates/{id}", fullEvaluate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fullEvaluate.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.result").value(DEFAULT_RESULT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingFullEvaluate() throws Exception {
        // Get the fullEvaluate
        restFullEvaluateMockMvc.perform(get("/api/full-evaluates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFullEvaluate() throws Exception {
        // Initialize the database
        fullEvaluateService.save(fullEvaluate);

        int databaseSizeBeforeUpdate = fullEvaluateRepository.findAll().size();

        // Update the fullEvaluate
        FullEvaluate updatedFullEvaluate = fullEvaluateRepository.findById(fullEvaluate.getId()).get();
        // Disconnect from session so that the updates on updatedFullEvaluate are not directly saved in db
        em.detach(updatedFullEvaluate);
        updatedFullEvaluate
            .description(UPDATED_DESCRIPTION)
            .result(UPDATED_RESULT);

        restFullEvaluateMockMvc.perform(put("/api/full-evaluates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFullEvaluate)))
            .andExpect(status().isOk());

        // Validate the FullEvaluate in the database
        List<FullEvaluate> fullEvaluateList = fullEvaluateRepository.findAll();
        assertThat(fullEvaluateList).hasSize(databaseSizeBeforeUpdate);
        FullEvaluate testFullEvaluate = fullEvaluateList.get(fullEvaluateList.size() - 1);
        assertThat(testFullEvaluate.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testFullEvaluate.getResult()).isEqualTo(UPDATED_RESULT);
    }

    @Test
    @Transactional
    public void updateNonExistingFullEvaluate() throws Exception {
        int databaseSizeBeforeUpdate = fullEvaluateRepository.findAll().size();

        // Create the FullEvaluate

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restFullEvaluateMockMvc.perform(put("/api/full-evaluates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fullEvaluate)))
            .andExpect(status().isBadRequest());

        // Validate the FullEvaluate in the database
        List<FullEvaluate> fullEvaluateList = fullEvaluateRepository.findAll();
        assertThat(fullEvaluateList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFullEvaluate() throws Exception {
        // Initialize the database
        fullEvaluateService.save(fullEvaluate);

        int databaseSizeBeforeDelete = fullEvaluateRepository.findAll().size();

        // Get the fullEvaluate
        restFullEvaluateMockMvc.perform(delete("/api/full-evaluates/{id}", fullEvaluate.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FullEvaluate> fullEvaluateList = fullEvaluateRepository.findAll();
        assertThat(fullEvaluateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FullEvaluate.class);
        FullEvaluate fullEvaluate1 = new FullEvaluate();
        fullEvaluate1.setId(1L);
        FullEvaluate fullEvaluate2 = new FullEvaluate();
        fullEvaluate2.setId(fullEvaluate1.getId());
        assertThat(fullEvaluate1).isEqualTo(fullEvaluate2);
        fullEvaluate2.setId(2L);
        assertThat(fullEvaluate1).isNotEqualTo(fullEvaluate2);
        fullEvaluate1.setId(null);
        assertThat(fullEvaluate1).isNotEqualTo(fullEvaluate2);
    }
}
