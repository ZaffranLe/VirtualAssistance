package app.web.rest;

import app.VirtualAssistantApp;

import app.domain.HeadQuater;
import app.repository.HeadQuaterRepository;
import app.service.HeadQuaterService;
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
 * Test class for the HeadQuaterResource REST controller.
 *
 * @see HeadQuaterResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VirtualAssistantApp.class)
public class HeadQuaterResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private HeadQuaterRepository headQuaterRepository;

    

    @Autowired
    private HeadQuaterService headQuaterService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restHeadQuaterMockMvc;

    private HeadQuater headQuater;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HeadQuaterResource headQuaterResource = new HeadQuaterResource(headQuaterService);
        this.restHeadQuaterMockMvc = MockMvcBuilders.standaloneSetup(headQuaterResource)
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
    public static HeadQuater createEntity(EntityManager em) {
        HeadQuater headQuater = new HeadQuater()
            .name(DEFAULT_NAME);
        return headQuater;
    }

    @Before
    public void initTest() {
        headQuater = createEntity(em);
    }

    @Test
    @Transactional
    public void createHeadQuater() throws Exception {
        int databaseSizeBeforeCreate = headQuaterRepository.findAll().size();

        // Create the HeadQuater
        restHeadQuaterMockMvc.perform(post("/api/head-quaters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(headQuater)))
            .andExpect(status().isCreated());

        // Validate the HeadQuater in the database
        List<HeadQuater> headQuaterList = headQuaterRepository.findAll();
        assertThat(headQuaterList).hasSize(databaseSizeBeforeCreate + 1);
        HeadQuater testHeadQuater = headQuaterList.get(headQuaterList.size() - 1);
        assertThat(testHeadQuater.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createHeadQuaterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = headQuaterRepository.findAll().size();

        // Create the HeadQuater with an existing ID
        headQuater.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHeadQuaterMockMvc.perform(post("/api/head-quaters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(headQuater)))
            .andExpect(status().isBadRequest());

        // Validate the HeadQuater in the database
        List<HeadQuater> headQuaterList = headQuaterRepository.findAll();
        assertThat(headQuaterList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllHeadQuaters() throws Exception {
        // Initialize the database
        headQuaterRepository.saveAndFlush(headQuater);

        // Get all the headQuaterList
        restHeadQuaterMockMvc.perform(get("/api/head-quaters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(headQuater.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getHeadQuater() throws Exception {
        // Initialize the database
        headQuaterRepository.saveAndFlush(headQuater);

        // Get the headQuater
        restHeadQuaterMockMvc.perform(get("/api/head-quaters/{id}", headQuater.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(headQuater.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingHeadQuater() throws Exception {
        // Get the headQuater
        restHeadQuaterMockMvc.perform(get("/api/head-quaters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHeadQuater() throws Exception {
        // Initialize the database
        headQuaterService.save(headQuater);

        int databaseSizeBeforeUpdate = headQuaterRepository.findAll().size();

        // Update the headQuater
        HeadQuater updatedHeadQuater = headQuaterRepository.findById(headQuater.getId()).get();
        // Disconnect from session so that the updates on updatedHeadQuater are not directly saved in db
        em.detach(updatedHeadQuater);
        updatedHeadQuater
            .name(UPDATED_NAME);

        restHeadQuaterMockMvc.perform(put("/api/head-quaters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedHeadQuater)))
            .andExpect(status().isOk());

        // Validate the HeadQuater in the database
        List<HeadQuater> headQuaterList = headQuaterRepository.findAll();
        assertThat(headQuaterList).hasSize(databaseSizeBeforeUpdate);
        HeadQuater testHeadQuater = headQuaterList.get(headQuaterList.size() - 1);
        assertThat(testHeadQuater.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingHeadQuater() throws Exception {
        int databaseSizeBeforeUpdate = headQuaterRepository.findAll().size();

        // Create the HeadQuater

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restHeadQuaterMockMvc.perform(put("/api/head-quaters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(headQuater)))
            .andExpect(status().isBadRequest());

        // Validate the HeadQuater in the database
        List<HeadQuater> headQuaterList = headQuaterRepository.findAll();
        assertThat(headQuaterList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHeadQuater() throws Exception {
        // Initialize the database
        headQuaterService.save(headQuater);

        int databaseSizeBeforeDelete = headQuaterRepository.findAll().size();

        // Get the headQuater
        restHeadQuaterMockMvc.perform(delete("/api/head-quaters/{id}", headQuater.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<HeadQuater> headQuaterList = headQuaterRepository.findAll();
        assertThat(headQuaterList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HeadQuater.class);
        HeadQuater headQuater1 = new HeadQuater();
        headQuater1.setId(1L);
        HeadQuater headQuater2 = new HeadQuater();
        headQuater2.setId(headQuater1.getId());
        assertThat(headQuater1).isEqualTo(headQuater2);
        headQuater2.setId(2L);
        assertThat(headQuater1).isNotEqualTo(headQuater2);
        headQuater1.setId(null);
        assertThat(headQuater1).isNotEqualTo(headQuater2);
    }
}
