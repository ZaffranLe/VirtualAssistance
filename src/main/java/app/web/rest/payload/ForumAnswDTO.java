package app.web.rest.payload;

import java.io.Serializable;

public class ForumAnswDTO implements Serializable {

    private String title;
    private String content;
    private long idroot;

    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @param content the content to set
     */
    public void setContent(String content) {
        this.content = content;
    }

    /**
     * @param idroot the idroot to set
     */
    public void setIdroot(long idroot) {
        this.idroot = idroot;
    }

    /**
     * @return the content
     */
    public String getContent() {
        return content;
    }

    /**
     * @return the idroot
     */
    public long getIdroot() {
        return idroot;
    }

    /**
     * @return the title
     */
    public String getTitle() {
        return title;
    }

}