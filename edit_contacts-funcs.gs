// Fetch data from "Bệnh Nhân" sheet
function getBenhNhanData() {
  const sheet = SpreadsheetApp.openById('1f13jrA8DtDWpjpWgxuBSV98_vrkMyIy9vVBnyYuJ_D0').getSheetByName('Bệnh Nhân');
  
  // Get the data starting from row 2, without the first row (header)
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  Logger.log(data);
  return data;
}

// Fetch data from "Gia Đình" sheet
function getGiaDinhData() {
  const sheet = SpreadsheetApp.openById('1f13jrA8DtDWpjpWgxuBSV98_vrkMyIy9vVBnyYuJ_D0').getSheetByName('Gia Đình');
  
  // Get the data starting from row 2, without the first row (header)
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  Logger.log(data);
  return data;
}


// Update the data in the "Bệnh Nhân" sheet
function updateBenhNhanData(data) {
  const sheet = SpreadsheetApp.openById('1f13jrA8DtDWpjpWgxuBSV98_vrkMyIy9vVBnyYuJ_D0').getSheetByName('Bệnh Nhân');
  
  // Clear existing data
  sheet.clearContents(); 

  // Ensure no empty rows are added (filter out empty rows from the data array)
  const cleanedData = data.filter(row => row.some(cell => cell.trim() !== ""));

  // Set the new values into the sheet
  sheet.getRange(1, 1, cleanedData.length, cleanedData[0].length).setValues(cleanedData); 
}

// Update the data in the "Gia Đình" sheet
function updateGiaDinhData(data) {
  const sheet = SpreadsheetApp.openById('1f13jrA8DtDWpjpWgxuBSV98_vrkMyIy9vVBnyYuJ_D0').getSheetByName('Gia Đình');
  
  // Clear existing data
  sheet.clearContents(); 

  // Ensure no empty rows are added (filter out empty rows from the data array)
  const cleanedData = data.filter(row => row.some(cell => cell.trim() !== ""));

  // Set the new values into the sheet
  sheet.getRange(1, 1, cleanedData.length, cleanedData[0].length).setValues(cleanedData); 
}
