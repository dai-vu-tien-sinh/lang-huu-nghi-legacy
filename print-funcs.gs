function submitData(obj){
  var ss = SpreadsheetApp.openById("1f13jrA8DtDWpjpWgxuBSV98_vrkMyIy9vVBnyYuJ_D0");
  var sheet = ss.getSheetByName("Bệnh nhân");
  var flag = 1;
  var lr = sheet.getLastRow();
  
  // Loop through rows to find the matching ID
  for (var i = 1; i <= lr; i++) {
    var id = sheet.getRange(i, 1).getValue();
    
    // Check if ID matches the search term
    if (id == obj) {
      flag = 0;
      var colB = sheet.getRange(i, 2).getValue();   // Full name
      var colC = sheet.getRange(i, 3).getValue();   // Date of birth
      var colD = sheet.getRange(i, 4).getValue();   // Gender
      var colE = sheet.getRange(i, 5).getValue();   // Address
      var colF = sheet.getRange(i, 6).getValue();   // Personal ID
      var colG = sheet.getRange(i, 7).getValue();   // Village support
      var colH = sheet.getRange(i, 8).getValue();   // Medical ID
      var colI = sheet.getRange(i, 9).getValue();   // Assessment ID
      var colJ = sheet.getRange(i, 10).getValue();  // Generation/target
      var colK = sheet.getRange(i, 11).getValue();  // Household
      var colL = sheet.getRange(i, 12).getValue();  // Date of acceptance
      var colM = sheet.getRange(i, 13).getValue();  // Date of integration
      
      var data = "<table><tr><th colspan=2><center><img src='https://drive.google.com/uc?id=1VQyOMDDcWwc9oUEFjE6a4yvsd-OehIyE' style='width:80px;margin-top:8px'><br><br>Làng Hữu Nghị Việt Nam<br>Penajam Paser Utara District<br>SD Negeri 001 Babulu</center><br></th></tr>"
                + "<tr><td>Patient ID:</td><td>" + obj + "</td></tr>"
                + "<tr><td>Full Name:</td><td>" + colB + "</td></tr>"
                + "<tr><td>Date of Birth:</td><td>" + colC + "</td></tr>"
                + "<tr><td>Gender:</td><td>" + colD + "</td></tr>"
                + "<tr><td>Address:</td><td>" + colE + "</td></tr>"
                + "<tr><td>Personal ID:</td><td>" + colF + "</td></tr>"
                + "<tr><td>Village Support:</td><td>" + colG + "</td></tr>"
                + "<tr><td>Medical ID:</td><td>" + colH + "</td></tr>"
                + "<tr><td>Assessment ID:</td><td>" + colI + "</td></tr>"
                + "<tr><td>Generation/Target:</td><td>" + colJ + "</td></tr>"
                + "<tr><td>Household:</td><td>" + colK + "</td></tr>"
                + "<tr><td>Date of Acceptance:</td><td>" + colL + "</td></tr>"
                + "<tr><td>Date of Integration:</td><td>" + colM + "</td></tr>"
                + "</table>";

      return data;
    }
  }

  // Return if data not found
  if (flag == 1) {
    var data = "Data not found!";
    return data;
  }
}

function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}
