from lxml import etree

input_peci = 'C:\\Users\\tamilselvan\\Downloads\\PECI_UK.xml'
xslt_path = 'D:\\Virtrual Environments\\peci_xslt.xml'
output_peci = 'D:\\Virtrual Environments\\NEW_PECI_UK.xml'

input_xml = etree.parse(input_peci)
xslt = etree.parse(xslt_path)

xslt_transformer = etree.XSLT(xslt)

output_xml = xslt_transformer(input_xml)

# # print(str(xslt_transformer(input_xml)))


# # root = input_xml.getroot()
output_str = etree.tostring(output_xml, pretty_print=True, encoding='utf-8')

# print(output_str.decode('utf-8'))

with open(output_peci,'wb') as f:
    f.write(output_str)