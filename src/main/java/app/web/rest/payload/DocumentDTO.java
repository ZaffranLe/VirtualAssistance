package app.web.rest.payload;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import app.domain.Document;
import app.domain.DocumentType;
import app.domain.TeacherDocument;
import app.domain.enumeration.Status;

/**
 * A Document.
 */

public class DocumentDTO implements Serializable {

    private  Document doc ;

    /**
     * @return the doc
     */
    public Document getDoc() {
        return doc;
    }
    /**
     * @param doc the doc to set
     */
    public void setDoc(Document doc) {
        this.doc = doc;
    }

    private String authenkey;

    /**
     * @param authenkey the authenkey to set
     */
    public void setAuthenkey(String authenkey) {
        this.authenkey = authenkey;
    }

    /**
     * @return the authenkey
     */
    public String getAuthenkey() {
        return authenkey;
    }


}
