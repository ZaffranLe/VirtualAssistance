package app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.itextpdf.text.TabStop.Alignment;

import app.domain.Answer;
import app.domain.CriteriaEvaluate;
import app.domain.CriteriaType;
import app.domain.FullEvaluate;
import app.domain.Proofs;
import app.security.SecurityUtils;
import app.service.AnswerService;
import app.service.CriteriaEvaluateService;
import app.service.CriteriaTypeService;
import app.service.FullEvaluateService;
import app.service.upload.exceptions.MyFileNotFoundException;
import app.web.rest.errors.BadRequestAlertException;
import app.web.rest.errors.InternalServerErrorException;
import app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

import org.apache.poi.xwpf.usermodel.ParagraphAlignment;
import org.apache.poi.xwpf.usermodel.UnderlinePatterns;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;
import org.apache.poi.xwpf.usermodel.XWPFRun;
import org.apache.poi.xwpf.usermodel.XWPFTable;
import org.docx4j.jaxb.Context;
import org.docx4j.model.table.TblFactory;
import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.docx4j.openpackaging.exceptions.InvalidFormatException;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.openpackaging.parts.WordprocessingML.MainDocumentPart;
import org.docx4j.wml.ObjectFactory;
import org.docx4j.wml.P;
import org.docx4j.wml.R;
import org.docx4j.wml.Tbl;
import org.docx4j.wml.Tc;
import org.docx4j.wml.Text;
import org.docx4j.wml.Tr;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTTcPr;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.CTVMerge;
import org.openxmlformats.schemas.wordprocessingml.x2006.main.STMerge;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ResourceBanner;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;

import afu.org.checkerframework.checker.units.qual.h;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;
import java.util.function.Predicate;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;

/**
 * REST controller for managing FullEvaluate.
 */
@RestController
@RequestMapping("/api")
public class FullEvaluateResource {

    private final Logger log = LoggerFactory.getLogger(FullEvaluateResource.class);

    private static final String ENTITY_NAME = "fullEvaluate";

    private final FullEvaluateService fullEvaluateService;
    private final AnswerService answerService;
    private final CriteriaTypeService criteriaTypeService;
    private final CriteriaEvaluateService criteriaEvaluateService;

    public FullEvaluateResource(CriteriaTypeService criteriaTypeService, FullEvaluateService fullEvaluateService,
            AnswerService answerService, CriteriaEvaluateService criteriaEvaluateService) {
        this.fullEvaluateService = fullEvaluateService;
        this.answerService = answerService;
        this.criteriaEvaluateService = criteriaEvaluateService;
        this.criteriaTypeService = criteriaTypeService;
    }

    /**
     * POST /full-evaluates : Create a new fullEvaluate.
     *
     * @param fullEvaluate the fullEvaluate to create
     * @return the ResponseEntity with status 201 (Created) and with body the new
     *         fullEvaluate, or with status 400 (Bad Request) if the fullEvaluate
     *         has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/full-evaluates")
    @Timed
    public ResponseEntity<FullEvaluate> createFullEvaluate(@RequestBody final FullEvaluate fullEvaluate)
            throws URISyntaxException {
        log.debug("REST request to save FullEvaluate : {}", fullEvaluate);
        if (fullEvaluate.getId() != null) {
            throw new BadRequestAlertException("A new fullEvaluate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        final FullEvaluate result = fullEvaluateService.save(fullEvaluate);
        return ResponseEntity.created(new URI("/api/full-evaluates/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString())).body(result);
    }

    /**
     * PUT /full-evaluates : Updates an existing fullEvaluate.
     *
     * @param fullEvaluate the fullEvaluate to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated
     *         fullEvaluate, or with status 400 (Bad Request) if the fullEvaluate is
     *         not valid, or with status 500 (Internal Server Error) if the
     *         fullEvaluate couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/full-evaluates")
    @Timed
    public ResponseEntity<FullEvaluate> updateFullEvaluate(@RequestBody final FullEvaluate fullEvaluate)
            throws URISyntaxException {
        log.debug("REST request to update FullEvaluate : {}", fullEvaluate);
        if (fullEvaluate.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        final FullEvaluate result = fullEvaluateService.save(fullEvaluate);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fullEvaluate.getId().toString())).body(result);
    }

    /**
     * GET /full-evaluates : get all the fullEvaluates.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of fullEvaluates
     *         in body
     */
    @GetMapping("/full-evaluates")
    @Timed
    public List<FullEvaluate> getAllFullEvaluates() {
        log.debug("REST request to get all FullEvaluates");
        return fullEvaluateService.findAll();
    }

    @GetMapping("/full-evaluates-bylogin")
    @Timed
    public List<FullEvaluate> getAllFullEvaluatesBylogin() {
        log.debug("REST request to get all FullEvaluates");
        return fullEvaluateService.findByLogin();
    }

    /**
     * GET /full-evaluates/:id : get the "id" fullEvaluate.
     *
     * @param id the id of the fullEvaluate to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the
     *         fullEvaluate, or with status 404 (Not Found)
     */

    @GetMapping("/full-evaluates/{id}")
    @Timed
    public ResponseEntity<FullEvaluate> getFullEvaluate(@PathVariable final Long id) {
        log.debug("REST request to get FullEvaluate : {}", id);
        final Optional<FullEvaluate> fullEvaluate = fullEvaluateService.findOne(id);
        // createTableWord("demo.docx");
        return ResponseUtil.wrapOrNotFound(fullEvaluate);
    }

    @GetMapping("/full-eval-download/{id}")
    @Timed
    public ResponseEntity<Resource> getFullEvaluateDownload(@PathVariable("id") final Long id,
            HttpServletResponse response) {
        log.debug("tao fillllllllllllllllllllllllllllllllllllllllllllllllllllllllll", id);
        final Optional<FullEvaluate> fullEvaluate = fullEvaluateService.findOne(id);
        final FullEvaluate entity = fullEvaluate.get();
        final List<Answer> listAnswers = answerService.getAnswersByFullEval(id);

        List<CriteriaEvaluate> criteriaEvaluate = criteriaEvaluateService.findAll();
        List<CriteriaType> criteriaType = criteriaTypeService.findAll();
        StringBuffer bufferNameFile = new StringBuffer();
        final XWPFDocument doc = new XWPFDocument();
        try {

            final XWPFParagraph title = doc.createParagraph();
            title.setAlignment(ParagraphAlignment.CENTER);
            title.setWordWrapped(true);
            final XWPFRun textTile = title.createRun();
            textTile.setText("PHIẾU TỰ ĐÁNH GIÁ CỦA GIÁO VIÊN CƠ SỞ GIÁO DỤC PHỔ THÔNG");
            textTile.setBold(true);
            textTile.addBreak();

            final XWPFParagraph name = doc.createParagraph();
            name.setWordWrapped(true);
            name.setAlignment(ParagraphAlignment.LEFT);
            final XWPFRun textname = name.createRun();
            textname.setText("Họ và tên giáo viên: .............................");
            // title.addCarriageReturn();

            final XWPFParagraph truong = doc.createParagraph();
            truong.setWordWrapped(true);
            truong.setAlignment(ParagraphAlignment.LEFT);
            final XWPFRun texttruong = truong.createRun();
            texttruong.setText("Trường: .............................");

            final XWPFParagraph monhoc = doc.createParagraph();
            monhoc.setWordWrapped(true);
            monhoc.setAlignment(ParagraphAlignment.LEFT);
            final XWPFRun textmon = monhoc.createRun();
            textmon.setText("Môn: .............................");

            final XWPFParagraph chunhiemlop = doc.createParagraph();
            chunhiemlop.setAlignment(ParagraphAlignment.LEFT);
            chunhiemlop.setWordWrapped(true);
            final XWPFRun textchunhiemlop = chunhiemlop.createRun();
            textchunhiemlop.setText("Chủ nhiệm: .............................");

            final XWPFParagraph diachi = doc.createParagraph();
            diachi.setAlignment(ParagraphAlignment.LEFT);
            diachi.setWordWrapped(true);
            final XWPFRun textdiachi = diachi.createRun();
            textdiachi.setText("Địa chỉ: .............................");

            final XWPFParagraph huongdan = doc.createParagraph();
            huongdan.setAlignment(ParagraphAlignment.LEFT);
            huongdan.setWordWrapped(true);
            final XWPFRun texhuongdan = huongdan.createRun();
            texhuongdan.setText("Hướng dẫn");
            // huongdan.set

            final XWPFParagraph noidung = doc.createParagraph();
            noidung.setAlignment(ParagraphAlignment.BOTH);
            noidung.setWordWrapped(true);
            final XWPFRun textnoidung = noidung.createRun();
            textnoidung.setText(
                    "Giáo viên nghiên cứu Thông tư số 20/2018/TT-BGDĐT, đọc kỹ nội dung yêu cầu các mức của từng tiêu chí, đối chiếu cẩn thận với các minh chứng và kết quả trong thực hiện nhiệm vụ của giáo viên trong năm học, tự đánh giá (đánh dấu x) các mức chưa đạt (CĐ); Đạt (Đ); Khá (K); Tốt (T).");

            // create table with 3 rows and 4 columns
            final XWPFTable table = doc.createTable(22, 6);

            final XWPFParagraph p1 = table.getRow(0).getCell(0).getParagraphs().get(0);
            p1.setAlignment(ParagraphAlignment.CENTER);
            final XWPFRun r1 = p1.createRun();
            r1.setBold(true);
            r1.setText("Tiêu chí");
            // write to first row, second column
            final XWPFParagraph p2 = table.getRow(0).getCell(1).getParagraphs().get(0);
            p2.setAlignment(ParagraphAlignment.CENTER);
            final XWPFRun r2 = p2.createRun();
            r2.setBold(true);
            r2.setText("Chưa đạt");
            // write to first row, third column
            final XWPFParagraph p3 = table.getRow(0).getCell(2).getParagraphs().get(0);
            p3.setAlignment(ParagraphAlignment.CENTER);
            final XWPFRun r3 = p3.createRun();
            r3.setBold(true);
            r3.setText("Đạt");
            // write to first row, fourth column
            final XWPFParagraph p4 = table.getRow(0).getCell(3).getParagraphs().get(0);
            p4.setAlignment(ParagraphAlignment.CENTER);
            final XWPFRun r4 = p4.createRun();
            r4.setBold(true);
            r4.setText("Khá");
            final XWPFParagraph p5 = table.getRow(0).getCell(4).getParagraphs().get(0);
            p4.setAlignment(ParagraphAlignment.CENTER);
            final XWPFRun r5 = p5.createRun();
            r5.setBold(true);
            r5.setText("Tốt");
            final XWPFParagraph p6 = table.getRow(0).getCell(5).getParagraphs().get(0);
            p4.setAlignment(ParagraphAlignment.CENTER);
            final XWPFRun r6 = p6.createRun();
            r6.setBold(true);
            r6.setText("Minh chứng");

            int row = 1;
            String xeploai = "Khá";
            for (int i = 0; i < criteriaType.size(); i++) {
                int k = i;
                // int r = row;
                // table.getRow(row).getCell(0).setText(criteriaType.get(i).getContent());
                final XWPFRun content = table.getRow(row).getCell(0).getParagraphs().get(0).createRun();
                content.setText(criteriaType.get(i).getContent());
                content.setBold(true);

                long count = criteriaEvaluate.stream().filter(o -> o.getLevel() == criteriaType.get(k).getLevel())
                        .count();
                List<CriteriaEvaluate> listCri = criteriaEvaluate.stream()
                        .filter(o -> o.getCriteriaType().getId() == criteriaType.get(k).getId())
                        .collect(Collectors.toList());
                for (int j = 0; j < listCri.size(); j++) {
                    int h = j;
                    table.getRow(row + j + 1).getCell(0).setText(listCri.get(j).getContent());
                    Answer asw = listAnswers.stream()
                            .filter(o -> o.getCriteriaEvaluate().getId() == listCri.get(h).getId()).findFirst().get();
                    switch (asw.getScoreLadder()) {
                    case EXCELLENT:
                        table.getRow(row + j + 1).getCell(4).setText("X");
                        break;
                    case GOOD:
                        table.getRow(row + j + 1).getCell(3).setText("X");
                        break;
                    case PASS:
                        table.getRow(row + j + 1).getCell(2).setText("X");
                        break;
                    case FAIL:
                        table.getRow(row + j + 1).getCell(1).setText("X");
                        break;

                    }
                    StringBuffer buffer = new StringBuffer();
                    for (Proofs proof : asw.getProffs()) {

                        buffer.append(proof.getName());
                        buffer.append("; ");
                    }
                    table.getRow(row + j + 1).getCell(5).setText(buffer.toString());

                }
                row = row + (int) count + 1;
            }
            /////////////////////////////////////////////////////////

            final XWPFParagraph nhanxet = doc.createParagraph();
            nhanxet.setAlignment(ParagraphAlignment.LEFT);
            nhanxet.setWordWrapped(true);
            final XWPFRun nhanxetr = nhanxet.createRun();
            nhanxetr.setText("1. Nhận xét (ghi rõ): ");
            nhanxetr.setBold(true);

            final XWPFParagraph manh = doc.createParagraph();
            manh.setWordWrapped(true);
            manh.setAlignment(ParagraphAlignment.LEFT);
            final XWPFRun manhr = manh.createRun();
            manhr.setText(
                    "- Điểm mạnh: ........................................................................................................................................................................");

            final XWPFParagraph yeu = doc.createParagraph();
            yeu.setWordWrapped(true);
            yeu.setAlignment(ParagraphAlignment.LEFT);
            final XWPFRun yeur = yeu.createRun();
            yeur.setText(
                    "- Những vấn đề cần cải thiện: ...........................................................................................................................................................................");

            final XWPFParagraph kehoach = doc.createParagraph();
            kehoach.setAlignment(ParagraphAlignment.BOTH);
            kehoach.setWordWrapped(true);
            final XWPFRun kehoachr = kehoach.createRun();
            kehoachr.setText("2. Kế hoạch học tập, bồi dưỡng phát triển năng lực nghề nghiệp trong năm học tiếp theo");
            kehoachr.setBold(true);

            final XWPFParagraph muctieu = doc.createParagraph();
            muctieu.setWordWrapped(true);
            muctieu.setAlignment(ParagraphAlignment.LEFT);
            final XWPFRun muctieur = muctieu.createRun();
            muctieur.setText(
                    "- Mục tiêu: ..........................................................................................................................................................................");

            final XWPFParagraph noidungdk = doc.createParagraph();
            noidungdk.setWordWrapped(true);
            noidungdk.setAlignment(ParagraphAlignment.LEFT);
            final XWPFRun noidungdkr = noidungdk.createRun();
            noidungdkr.setText(
                    "- Nội dung đăng ký học tập, bồi dưỡng (các năng lực cần ưu tiên cải thiện): ............................................................................................................................................................................");

            final XWPFParagraph thogian = doc.createParagraph();
            thogian.setWordWrapped(true);
            thogian.setAlignment(ParagraphAlignment.LEFT);
            final XWPFRun thogianr = thogian.createRun();
            thogianr.setText(
                    "- Thời gian: ...........................................................................................................................................................................");

            final XWPFParagraph dieukien = doc.createParagraph();
            dieukien.setWordWrapped(true);
            dieukien.setAlignment(ParagraphAlignment.LEFT);
            final XWPFRun dieukienr = dieukien.createRun();
            dieukienr.setText(
                    "- Điều kiện thực hiện: :................................................................................................................................................................................");

            switch (entity.getResult()) {
            case EXCELLENT:
                xeploai = "TỐT";
                break;
            case GOOD:
                xeploai = "KHÁ";

                break;
            case PASS:
                xeploai = "ĐẠT";

                break;
            case FAIL:
                xeploai = "CHƯA ĐẠT";

                break;

            }
            final XWPFParagraph tongketqua = doc.createParagraph();
            tongketqua.setWordWrapped(true);
            tongketqua.setAlignment(ParagraphAlignment.CENTER);
            final XWPFRun tongketquar = tongketqua.createRun();
            tongketquar.setText("Xếp loại kết quả đánh giá: " + xeploai);
            tongketquar.setBold(true);

            final XWPFParagraph thoigian = doc.createParagraph();
            thoigian.setWordWrapped(true);
            thoigian.setAlignment(ParagraphAlignment.RIGHT);
            final XWPFRun thoigianr = thoigian.createRun();
            thoigianr.setText("......, ngày....tháng....năm....");

            final XWPFParagraph chuky = doc.createParagraph();
            chuky.setWordWrapped(true);
            chuky.setAlignment(ParagraphAlignment.RIGHT);
            final XWPFRun chukyr = chuky.createRun();
            chukyr.setText("Nguời tự đánh giá");
            chukyr.setBold(true);

            //////////////////////////////////////////////////
            OutputStream out = null;///////////////////
            String user = SecurityUtils.getCurrentUserLogin()
                    .orElseThrow(() -> new InternalServerErrorException("Current user login not found"));
            try {

                bufferNameFile.append("uploads");
                bufferNameFile.append("/");
                bufferNameFile.append(user);
                bufferNameFile.append("/");
                bufferNameFile.append("baocao");
                Path path = Paths.get(bufferNameFile.toString()).toAbsolutePath().normalize();
                Files.createDirectories(path);
                bufferNameFile.append("/");
                bufferNameFile.append(String.valueOf(new Date().getTime()));
                bufferNameFile.append("_bc.docx");
                out = new FileOutputStream(bufferNameFile.toString());
                doc.write(out);
                // response.getOutputStream();
                // doc.write(response.getOutputStream());

            } catch (final IOException e) {
                e.printStackTrace();
            } finally {
                try {
                    out.close();
                } catch (final IOException e) {
                    e.printStackTrace();
                }
            }
        } finally {
            try {
                doc.close();
                try {
                    Path filePath = Paths.get(bufferNameFile.toString());
                    Resource resource = new UrlResource(filePath.toUri());
                    if (resource.exists()) {
                        return ResponseEntity.ok().contentType(MediaType.parseMediaType("application/octet-stream"))
                                .header(HttpHeaders.CONTENT_DISPOSITION,
                                        "attachment; filename=\"" + resource.getFilename() + "\"")
                                .body(resource);

                    } else {
                        throw new MyFileNotFoundException("File not found " + bufferNameFile.toString());
                    }
                } catch (MalformedURLException ex) {
                    throw new MyFileNotFoundException("File not found " + bufferNameFile.toString(), ex);
                }
            } catch (final IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    /**
     * DELETE /full-evaluates/:id : delete the "id" fullEvaluate.
     *
     * @param id the id of the fullEvaluate to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/full-evaluates/{id}")
    @Timed
    public ResponseEntity<Void> deleteFullEvaluate(@PathVariable final Long id) {
        log.debug("REST request to delete FullEvaluate : {}", id);
        fullEvaluateService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    @PostMapping("/create-full-evaluates/{questionresult}/{result}")
    @Timed
    public ResponseEntity<Void> createEvaluate(@PathVariable(name = "questionresult") final String[] questionresult,
            @PathVariable(name = "result") final String finalresult) throws URISyntaxException {
        fullEvaluateService.create(finalresult, questionresult);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, null)).build();

    }

    @PostMapping("/create-full-evaluates/{questionresult}/{result}/{nameSurvey}")
    @Timed
    public ResponseEntity<Void> createEvaluateWithName(
            @PathVariable(name = "questionresult") final String[] questionresult,
            @PathVariable(name = "result") final String finalresult,
            @PathVariable(name = "nameSurvey") final String nameSurvey, @RequestParam final String[] fileResult)
            throws URISyntaxException {
        System.out.println(fileResult);
        fullEvaluateService.create(finalresult, questionresult, nameSurvey, fileResult);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, null)).build();

    }

    @PostMapping("/create-full-evaluates-ans/{nameSurvey}")
    @Timed
    public ResponseEntity<FullEvaluate> createEvaluateWithAnswer(
            @PathVariable(name = "nameSurvey") final String nameSurvey, @RequestBody final List<Answer> answerList)
            throws URISyntaxException {
        System.out.println(answerList);
        final FullEvaluate fullEvaluate = fullEvaluateService.create(answerList, nameSurvey);
        return ResponseEntity.created(new URI("/api/full-evaluates/"))
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fullEvaluate.getId().toString()))
                .body(fullEvaluate);
    }

    @PutMapping("/create-full-evaluates/{idFullEvaluate}/{result}/{nameSurvey}")
    @Timed
    public ResponseEntity<FullEvaluate> updateEvaluateWithName(
            @PathVariable(name = "idFullEvaluate") final String idFullEvaluate,
            @PathVariable(name = "result") final String finalresult,
            @PathVariable(name = "nameSurvey") final String nameSurvey, @RequestBody final List<Answer> answerList)
            throws URISyntaxException {
        final long id = Long.valueOf(idFullEvaluate);
        final FullEvaluate fullEvaluate = fullEvaluateService.update(id, finalresult, nameSurvey, answerList);
        // return
        // ResponseEntity.ok().headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME,
        // null)).build();
        return ResponseEntity.created(new URI("/api/full-evaluates/" + fullEvaluate))
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fullEvaluate.getId().toString()))
                .body(fullEvaluate);

    }

}
