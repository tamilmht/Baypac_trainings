import xml.etree.ElementTree as ET

peci_file_path = 'C:\\Users\\tamilselvan\\Downloads\\PECI_UK.xml'
# Parse the XML file
tree = ET.parse(peci_file_path)
root = tree.getroot()
namespace = {'peci': 'urn:com.workday/peci'}

# for data in root.findall('.//peci:Summary', namespace):
#     print (data.find('.//peci:Pay_Group_ID', namespace).text if data.find('.//peci:Pay_Group_ID', namespace) is not None else None)
#     print (data.find('.//peci:Pay_Group_Name', namespace).text if data.find('.//peci:Pay_Group_Name', namespace) is not None else None)
#     print (data.find('.//peci:Pay_Group_Country', namespace).text if data.find('.//peci:Pay_Group_Country', namespace) is not None else None)
#     print (data.find('.//peci:Pay_Group_Code', namespace).text if data.find('.//peci:Pay_Group_Code', namespace) is not None else None)
#     print (data.find('.//peci:Pay_Period_Start', namespace).text if data.find('.//peci:Pay_Period_Start', namespace) is not None else None)
#     print (data.find('.//peci:Pay_Period_End', namespace).text if data.find('.//peci:Pay_Period_End', namespace) is not None else None)
#     print (data.find('.//peci:Updated_From', namespace).text if data.find('.//peci:Updated_From', namespace) is not None else None)
#     print (data.find('.//peci:Updated_To', namespace).text if data.find('.//peci:Updated_To', namespace) is not None else None)
#     print (data.find('.//peci:Effective_From', namespace).text if data.find('.//peci:Effective_From', namespace) is not None else None)
#     print (data.find('.//peci:Effective_To', namespace).text if data.find('.//peci:Effective_To', namespace) is not None else None)
#     print (data.find('.//peci:Sample', namespace).text if data.find('.//peci:Sample', namespace) is not None else None)

for Worker in root.findall('.//peci:Worker', namespace):
    for Worker_data in Worker:
        tag_name = Worker_data.tag.split('}')[-1]
        if tag_name == 'Worker_Summary':
            wid = Worker_data.find('.//peci:WID', namespace).text if Worker_data.findall('.//peci:WID', namespace) is not None else None
            employee_id = Worker_data.find('.//peci:Employee_ID', namespace).text if Worker_data.find('.//peci:Employee_ID', namespace) is not None else None
            name = Worker_data.find('.//peci:Name', namespace).text if Worker_data.find('.//peci:Name', namespace) is not None else None
            # print(wid,employee_id,name)
        elif tag_name == 'Effective_Change':
            Sequence = Worker_data.get('{urn:com.workday/peci}Sequence')

            derived_event_code = Worker_data.find('.//peci:Derived_Event_Code', namespace).text if Worker_data.find('.//peci:Derived_Event_Code', namespace) is not None else None
            Effective_Moment = Worker_data.find('.//peci:Effective_Moment', namespace).text if Worker_data.find('.//peci:Effective_Moment', namespace) is not None else None
            Entry_Moment = Worker_data.find('.//peci:Entry_Moment', namespace).text if Worker_data.find('.//peci:Entry_Moment', namespace) is not None else None
            # print(wid,employee_id,Sequence,derived_event_code,Effective_Moment,Entry_Moment)

            #Compensation Plans
            print(Worker_data.find('.//peci:Position_ID', namespace).text)


