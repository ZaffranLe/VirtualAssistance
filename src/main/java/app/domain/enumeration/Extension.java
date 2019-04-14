package app.domain.enumeration;

/**
 * The Extension enumeration.
 */
public enum Extension {
    DOCX, PDF, MP4, PPTX, JPG, PNG, DOC, PPT, ORTHER;

    public static Extension getByName(String s) {
        if (s.toUpperCase().equals("DOCX"))
            return DOCX;
        if (s.toUpperCase().equals("PDF"))
            return PDF;
        if (s.toUpperCase().equals("MP4"))
            return MP4;
        if (s.toUpperCase().equals("PPTX"))
            return PPTX;
        if (s.toUpperCase().equals("JPG"))
            return JPG;
        if (s.toUpperCase().equals("PNG"))
            return PNG;
        if (s.toUpperCase().equals("DOC"))
            return DOC;
        if (s.toUpperCase().equals("PPT"))
            return PPT;

        return ORTHER;
    }
}
