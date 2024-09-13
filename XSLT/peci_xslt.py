from lxml import etree

input_xml = '''<books>
    <book>
        <id>1</id>
        <name>book1</name>
        <author>Author1</author>
        <year>2022</year>
    </book>
    <book>
        <id>2</id>
        <name>book2</name>
        <author>Author2</author>
        <year>2024</year>
    </book>
</books>'''

xslt = '''<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" indent="yes"/>
    <xsl:template match="/books">
        <root>
            <bookname>
                <xsl:for-each select="book">
                    <row>
                        <id><xsl:value-of select="id"/></id>
                        <name><xsl:value-of select="name"/></name>
                    </row>
                </xsl:for-each>
            </bookname>
            <bookauthor>
                <xsl:for-each select="book">
                    <row>
                        <id><xsl:value-of select="id"/></id>
                        <author><xsl:value-of select="author"/></author>
                    </row>
                </xsl:for-each>
            </bookauthor>
            <bookyear>
                <xsl:for-each select="book">
                    <row>
                        <id><xsl:value-of select="id"/></id>
                        <year><xsl:value-of select="year"/></year>
                    </row>
                </xsl:for-each>
            </bookyear>
        </root>
    </xsl:template>
</xsl:stylesheet>'''

# Parse the input XML and XSLT
xml_doc = etree.XML(input_xml)
xslt_doc = etree.XML(xslt)

# Transform the input XML with the XSLT
transform = etree.XSLT(xslt_doc)
result_tree = transform(xml_doc)

# Print the transformed XML
print(str(result_tree))
