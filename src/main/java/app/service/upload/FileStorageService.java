package app.service.upload;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import app.security.SecurityUtils;
import app.security.jwt.TokenProvider;
import app.service.upload.exceptions.FileStorageException;
import app.service.upload.exceptions.MyFileNotFoundException;
import app.service.util.FileNameNormal;
import app.service.util.docstopdfconverter.*;
import app.web.rest.DocumentResource;
import app.web.rest.errors.InternalServerErrorException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;

@Service
public class FileStorageService {

    private Path fileStorageLocation;

    @Autowired
    TokenProvider tokenprovider;

    @Autowired
    public FileStorageService() {
        this.fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.",
                    ex);
        }
    }

    public void setFolderUpload(String name) {
        this.fileStorageLocation = Paths.get("uploads/" + name).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.",
                    ex);
        }
    }

    public String storeDocumentUploadByUser(MultipartFile file) {

        String user = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new InternalServerErrorException("Current user login not found"));
        setFolderUpload(user);
        return storeFile(file);
    }
    public String storeFileEvaluateUploadByUser(MultipartFile file) {

        String user = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new InternalServerErrorException("Current user login not found"));
        setFolderUpload(user+"/minhchung");
        return storeFile(file);
    }

    private String convertToPDF(Path targetLocation, String fileName) {
        Converter converter = null;
        boolean shouldShowMessages = true;
        FileInputStream inStream= null;
        try {
            inStream = new FileInputStream(targetLocation.toFile());
        } catch (FileNotFoundException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }
        String filePDF = fileName;

        try {
            if (fileName.endsWith("doc")) {
                filePDF = fileName.replace(".", "_") + ".pdf";
                // Path targetPDF = this.fileStorageLocation.resolve(filePDF);
                // FileOutputStream outStream = new FileOutputStream(targetPDF.toFile());
                // converter = new DocToPDFConverter(inStream, outStream, shouldShowMessages, true);
                // converter.convert();
                // return filePDF;
                return fileName;
            } else if (fileName.endsWith("docx")) {
                // filePDF = fileName.replace(".", "_") + ".pdf";
                // Path targetPDF = this.fileStorageLocation.resolve(filePDF);
                // FileOutputStream outStream = new FileOutputStream(targetPDF.toFile());
                // converter = new DocxToPDFConverter(inStream, outStream, shouldShowMessages, true);
                // converter.convert();
                // return filePDF;
                return fileName;
            } else if (fileName.endsWith("ppt")) {
                filePDF = fileName.replace(".", "_") + ".pdf";
                Path targetPDF = this.fileStorageLocation.resolve(filePDF);
                FileOutputStream outStream = new FileOutputStream(targetPDF.toFile());
                converter = new PptToPDFConverter(inStream, outStream, shouldShowMessages, true);
                converter.convert();
                return filePDF;
            } else if (fileName.endsWith("pptx")) {
                filePDF = fileName.replace(".", "_") + ".pdf";
                Path targetPDF = this.fileStorageLocation.resolve(filePDF);
                FileOutputStream outStream = new FileOutputStream(targetPDF.toFile());
                converter = new PptxToPDFConverter(inStream, outStream, shouldShowMessages, true);
                converter.convert();
                return filePDF;
            } else if (fileName.endsWith("odt")) {
                filePDF = fileName.replace(".", "_") + ".pdf";
                Path targetPDF = this.fileStorageLocation.resolve(filePDF);
                FileOutputStream outStream = new FileOutputStream(targetPDF.toFile());
                converter = new OdtToPDF(inStream, outStream, shouldShowMessages, true);
                converter.convert();
                return filePDF;
            }
        } catch (Exception e) {
            // TODO: handle exception
          System.out.println("Could not convert file " + filePDF + ". Please try again!!!!");
          e.printStackTrace();
          

        }

        return fileName;

    }

    public String storeFile(MultipartFile file) {

        // Normalize file name
        String fileName = FileNameNormal.normal(file.getOriginalFilename());
        System.out.println("ten file: " + fileName);
        // fileName = FileNameNormal.normal(fileName);
        fileName = StringUtils.cleanPath(fileName);
        if(fileName.length()>6){
            fileName = fileName.substring(fileName.length()-6);
        }
        System.out.println("ten file sau cleanPath: " + fileName);
        try {
            // Check if the file's name contains invalid characters
            if (fileName.contains("..") || !checkFileExt(fileName)) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            // Copy file to the target location (Replacing existing file with the same name)
            // String.valueOf(new Date().getTime())
            fileName = new Date().getTime() + "_" + fileName;
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            fileName = convertToPDF(targetLocation,fileName);
            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    private boolean checkFileExt(String fileName) {

        String fileExt = FilenameUtils.getExtension(fileName);
        System.out.println("-------------------------------------------------------" + fileExt);
        if (fileExt.compareToIgnoreCase("doc") == 0 || fileExt.compareToIgnoreCase("docx") == 0
                || fileExt.compareToIgnoreCase("ppt") == 0 || fileExt.compareToIgnoreCase("pptx") == 0
                || fileExt.compareToIgnoreCase("png") == 0 || fileExt.compareToIgnoreCase("jpeg") == 0
                || fileExt.compareToIgnoreCase("gif") == 0 || fileExt.compareToIgnoreCase("pdf") == 0
                || fileExt.compareToIgnoreCase("xlsx") == 0 || fileExt.compareToIgnoreCase("jpg") == 0
                || fileExt.compareToIgnoreCase("xls") == 0 || fileExt.compareToIgnoreCase("txt") == 0) {

            return true;
        }
        /*
                
        */

        return false;
    }

    public Resource loadFileAsResource(String fileName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new MyFileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File not found " + fileName, ex);
        }
    }

    public Resource loadFileAsResourceByUser(String user, String fileName) {
        try {
            this.setFolderUpload(user);
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new MyFileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new MyFileNotFoundException("File not found " + fileName, ex);
        }
    }

    public Resource loadFileByJWT(String key) {
        // boolean validatekey =
        // tokenprovider.validateTokenBySign(DocumentResource.secretKey,key);

        // if(!validatekey) throw new MyFileNotFoundException("key not validate: " +
        // key);
        try {
            Claims claims = Jwts.parser().setSigningKey(DocumentResource.secretKey).parseClaimsJws(key).getBody();
            String url = claims.get(DocumentResource.FILE_KEY).toString();

            Path filePath = this.fileStorageLocation.resolve(url).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new MyFileNotFoundException("File not found " + filePath.toAbsolutePath());
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new MyFileNotFoundException("File not found " + " jwt ", ex);
        }
    }
}
