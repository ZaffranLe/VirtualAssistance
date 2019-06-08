package app.web.rest;

import app.VirtualAssistantApp;

import app.domain.Proofs;
import app.repository.ProofsRepository;
import app.service.ProofsService;
import app.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ProofsResource REST controller.
 *
 * @see ProofsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = VirtualAssistantApp.class)
public class ProofsResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    @Autowired
    private ProofsRepository proofsRepository;
    @Mock
    private ProofsRepository proofsRepositoryMock;
    
    @Mock
    private ProofsService proofsServiceMock;

    @Autowired
    private ProofsService proofsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProofsMockMvc;

    private Proofs proofs;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProofsResource proofsResource = new ProofsResource(proofsService);
        this.restProofsMockMvc = MockMvcBuilders.standaloneSetup(proofsResource)
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
    public static Proofs createEntity(EntityManager em) {
        Proofs proofs = new Proofs()
            .name(DEFAULT_NAME)
            .url(DEFAULT_URL);
        return proofs;
    }

    @Before
    public void initTest() {
        proofs = createEntity(em);
    }

    @Test
    @Transactional
    public void createProofs() throws Exception {
        int databaseSizeBeforeCreate = proofsRepository.findAll().size();

        // Create the Proofs
        restProofsMockMvc.perform(post("/api/proofs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proofs)))
            .andExpect(status().isCreated());

        // Validate the Proofs in the database
        List<Proofs> proofsList = proofsRepository.findAll();
        assertThat(proofsList).hasSize(databaseSizeBeforeCreate + 1);
        Proofs testProofs = proofsList.get(proofsList.size() - 1);
        assertThat(testProofs.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testProofs.getUrl()).isEqualTo(DEFAULT_URL);
    }

    @Test
    @Transactional
    public void createProofsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = proofsRepository.findAll().size();

        // Create the Proofs with an existing ID
        proofs.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProofsMockMvc.perform(post("/api/proofs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proofs)))
            .andExpect(status().isBadRequest());

        // Validate the Proofs in the database
        List<Proofs> proofsList = proofsRepository.findAll();
        assertThat(proofsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProofs() throws Exception {
        // Initialize the database
        proofsRepository.saveAndFlush(proofs);

        // Get all the proofsList
        restProofsMockMvc.perform(get("/api/proofs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(proofs.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL.toString())));
    }
    
    public void getAllProofsWithEagerRelationshipsIsEnabled() throws Exception {
        ProofsResource proofsResource = new ProofsResource(proofsServiceMock);
        when(proofsServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restProofsMockMvc = MockMvcBuilders.standaloneSetup(proofsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restProofsMockMvc.perform(get("/api/proofs?eagerload=true"))
        .andExpect(status().isOk());

        verify(proofsServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllProofsWithEagerRelationshipsIsNotEnabled() throws Exception {
        ProofsResource proofsResource = new ProofsResource(proofsServiceMock);
            when(proofsServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restProofsMockMvc = MockMvcBuilders.standaloneSetup(proofsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restProofsMockMvc.perform(get("/api/proofs?eagerload=true"))
        .andExpect(status().isOk());

            verify(proofsServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getProofs() throws Exception {
        // Initialize the database
        proofsRepository.saveAndFlush(proofs);

        // Get the proofs
        restProofsMockMvc.perform(get("/api/proofs/{id}", proofs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(proofs.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingProofs() throws Exception {
        // Get the proofs
        restProofsMockMvc.perform(get("/api/proofs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProofs() throws Exception {
        // Initialize the database
        proofsService.save(proofs);

        int databaseSizeBeforeUpdate = proofsRepository.findAll().size();

        // Update the proofs
        Proofs updatedProofs = proofsRepository.findById(proofs.getId()).get();
        // Disconnect from session so that the updates on updatedProofs are not directly saved in db
        em.detach(updatedProofs);
        updatedProofs
            .name(UPDATED_NAME)
            .url(UPDATED_URL);

        restProofsMockMvc.perform(put("/api/proofs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProofs)))
            .andExpect(status().isOk());

        // Validate the Proofs in the database
        List<Proofs> proofsList = proofsRepository.findAll();
        assertThat(proofsList).hasSize(databaseSizeBeforeUpdate);
        Proofs testProofs = proofsList.get(proofsList.size() - 1);
        assertThat(testProofs.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testProofs.getUrl()).isEqualTo(UPDATED_URL);
    }

    @Test
    @Transactional
    public void updateNonExistingProofs() throws Exception {
        int databaseSizeBeforeUpdate = proofsRepository.findAll().size();

        // Create the Proofs

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restProofsMockMvc.perform(put("/api/proofs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(proofs)))
            .andExpect(status().isBadRequest());

        // Validate the Proofs in the database
        List<Proofs> proofsList = proofsRepository.findAll();
        assertThat(proofsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProofs() throws Exception {
        // Initialize the database
        proofsService.save(proofs);

        int databaseSizeBeforeDelete = proofsRepository.findAll().size();

        // Get the proofs
        restProofsMockMvc.perform(delete("/api/proofs/{id}", proofs.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Proofs> proofsList = proofsRepository.findAll();
        assertThat(proofsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Proofs.class);
        Proofs proofs1 = new Proofs();
        proofs1.setId(1L);
        Proofs proofs2 = new Proofs();
        proofs2.setId(proofs1.getId());
        assertThat(proofs1).isEqualTo(proofs2);
        proofs2.setId(2L);
        assertThat(proofs1).isNotEqualTo(proofs2);
        proofs1.setId(null);
        assertThat(proofs1).isNotEqualTo(proofs2);
    }
}
