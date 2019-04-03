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
import app.web.rest.DocumentResource;
import app.web.rest.errors.InternalServerErrorException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;

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

    public String storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

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
            return fileName;
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    private boolean checkFileExt(String fileName) {

        String fileExt =FilenameUtils.getExtension(fileName);
        System.out.print("-------------------------------------------------------"+fileExt);
        if (fileExt.compareToIgnoreCase("doc") == 0 || fileExt.compareToIgnoreCase("docx") == 0
                || fileExt.compareToIgnoreCase("ppt") == 0 || fileExt.compareToIgnoreCase("pptx") == 0
                || fileExt.compareToIgnoreCase("png") == 0 || fileExt.compareToIgnoreCase("jpeg") == 0
                || fileExt.compareToIgnoreCase("gif") == 0 || fileExt.compareToIgnoreCase("pdf") == 0
                || fileExt.compareToIgnoreCase("xlsx") == 0 
                || fileExt.compareToIgnoreCase("xls") == 0
                || fileExt.compareToIgnoreCase("txt") == 0
                ) {

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
    public Resource loadFileAsResourceByUser(String user,String fileName) {
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
        boolean validatekey = tokenprovider.validateTokenBySign(DocumentResource.secretKey,key);
        
        try {
            if(!validatekey)  throw new MyFileNotFoundException("key not validate: " + key);
            Claims claims =   Jwts.parser().setSigningKey(DocumentResource.secretKey).parseClaimsJws(key).getBody();
            String url = claims.get(DocumentResource.FILE_KEY).toString();
          
            Path filePath = this.fileStorageLocation.resolve(url).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new MyFileNotFoundException("File not found " + url);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new MyFileNotFoundException("File not found " + " jwt ", ex);
        }
    }
}
