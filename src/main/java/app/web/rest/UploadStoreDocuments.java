/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package app.web.rest;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import app.security.SecurityUtils;
import app.service.upload.FileStorageService;
import app.web.rest.errors.BadRequestAlertException;
import app.web.rest.errors.InternalServerErrorException;
/**
 *
 * @author MIP
 */
@Controller
@RequestMapping("/api")
public class UploadStoreDocuments {
    @Autowired
    private FileStorageService fileStorageService;
    @PostMapping("/uploadStoreDocuments")
    public ResponseEntity<String> uploadFile(@RequestParam("filepond") MultipartFile file) {

        // getUser
        String fileName = fileStorageService.storeDocumentUploadByUser(file);
        String ext = FilenameUtils.getExtension(fileName);
        String user = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new InternalServerErrorException("Current user login not found"));
        String fileNameForDB = user+"/"+fileName;
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("api/downloadFile/")
                .path(fileNameForDB)
                .toUriString();
        return  ResponseEntity.ok()
                .contentType(MediaType.TEXT_PLAIN)
                .header("url", fileDownloadUri)
                .header("ext", ext)
                .body(fileNameForDB);
    }

    @GetMapping("/downloadFile/{user:.+}/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String user,@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResourceByUser(user,fileName);     
        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            throw new BadRequestAlertException("File not found!!!", "contentType", "contentType");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
    @GetMapping("/downloadFile/{url}")
    public ResponseEntity<Resource> downloadFileByUrl(@PathVariable String url, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(url);     
        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            throw new BadRequestAlertException("File not found!!!", "contentType", "contentType");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
    @GetMapping("/opendocument/{key}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String key, HttpServletRequest request) {
        // Load file as Resource
        System.out.println("key:"+key);
        Resource resource = fileStorageService.loadFileByJWT(key);
        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            throw new BadRequestAlertException("File not found!!!", "contentType", "contentType");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
