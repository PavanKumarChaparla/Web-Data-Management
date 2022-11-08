package xslt;

import javax.xml.parsers.*;
import org.w3c.dom.*;
import javax.xml.transform.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.stream.*;
import java.io.*;

class XSLT {
	
	public static void main(String argv[]) throws Exception {
		File xml = new File("recipes.xml");
        File xsl = new File("recipes.xsl");
		DocumentBuilderFactory documentBuildFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder documentBuild = documentBuildFactory.newDocumentBuilder();
		Document document = documentBuild.parse(xml);
		StreamSource stylesource = new StreamSource(xsl);
		TransformerFactory transformFactory = TransformerFactory.newInstance();
		Transformer xmlToHtml = transformFactory.newTransformer(stylesource);
		DOMSource source = new DOMSource(document);
		StreamResult result = new StreamResult(System.out);
		xmlToHtml.transform(source, result);
	}
}