package app.service.util.docstopdfconverter;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics2D;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import org.apache.poi.hslf.record.Slide;
import org.apache.poi.hslf.usermodel.HSLFSlide;
import org.apache.poi.sl.usermodel.SlideShow;
import org.apache.poi.sl.usermodel.SlideShowFactory;
import org.apache.poi.xslf.model.*;
import org.apache.poi.xslf.usermodel.*;

public class PptToPDFConverter extends PptxToPDFConverter {

	private List<HSLFSlide > slides;
	
	public PptToPDFConverter(InputStream inStream, OutputStream outStream, boolean showMessages, boolean closeStreamsWhenComplete) {
		super(inStream, outStream, showMessages, closeStreamsWhenComplete);
	}


	@Override	
	protected Dimension processSlides() throws IOException{

		SlideShow ppt = new SlideShowFactory().create(inStream);
		Dimension dimension = ppt.getPageSize();
		slides = ppt.getSlides();
		return dimension;
	}
	
	@Override
	protected int getNumSlides(){
		return slides.size();
	}
	
	@Override
	protected void drawOntoThisGraphic(int index, Graphics2D graphics){
		slides.get(index).draw(graphics);
		// slides.get(index).
	}
	
	@Override
	protected Color getSlideBGColor(int index){
		return Color.WHITE;
		
		// getBackground().getFill().getForegroundColor();
	}

}
