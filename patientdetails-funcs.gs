/*function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('PatientDetails');
}*/

function getPatientDetails(patientId) {
  var sheet = SpreadsheetApp.openById("YOUR_SPREADSHEET_ID");
  var patientSheet = sheet.getSheetByName("Bệnh nhân");
  var familySheet = sheet.getSheetByName("Gia đình");
  
  var patientData = getRowData(patientSheet, patientId, 1);
  if (!patientData) return null;
  
  var familyData = getRowData(familySheet, patientData[1], 1);
  return { ...formatPatientData(patientData), ...formatFamilyData(familyData) };
}

function getRowData(sheet, searchValue, columnIndex) {
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][columnIndex - 1] == searchValue) return data[i];
  }
  return null;
}

function formatPatientData(data) {
  return {
    id: data[0], familyId: data[1], policyId: data[2], classId: data[3],
    villageSupport: data[4], medicalId: data[5], evaluationId: data[6],
    name: data[7], birthDate: data[8], gender: data[9],
    address: data[10], personalId: data[11], generation: data[12],
    household: data[13], admissionDate: data[14], integrationDate: data[15]
  };
}

function formatFamilyData(data) {
  if (!data) return {};
  return {
    fatherName: data[2], motherName: data[3], contact: data[4],
    fatherJob: data[5], motherJob: data[6], guardianInfo: data[8]
  };
}
