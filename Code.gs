/**
 * Serves the login HTML page when a GET request is received.
 * @return {HtmlOutput} The HTML content of the login page.
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index').getContent();
}

/**
 * Checks the provided login credentials against the data in the spreadsheet.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @return {boolean} True if credentials match, false otherwise.
 */
function checkLogin(email, password) {
  // Open the spreadsheet using its ID
  const ss = SpreadsheetApp.openById('1f13jrA8DtDWpjpWgxuBSV98_vrkMyIy9vVBnyYuJ_D0');
  // Access the specific sheet where credentials are stored
  const sheet = ss.getSheetByName('Bệnh nhân');
  // Retrieve all data from the sheet
  const data = sheet.getDataRange().getValues();

  // Loop through the data to find a matching email and password
  for (let i = 1; i < data.length; i++) {
    //Logger.log(data[i][0]); Logger.log(data[i][1]);
    if (data[i][0] == email && data[i][1] == password) {
      const userProperties = PropertiesService.getUserProperties();
      userProperties.setProperty('user-name', data[i][0]);
      return {
        username: email
      };
    }
  }

  return false; // No match found
}
function getUserInfo() {
  const userProperties = PropertiesService.getUserProperties();
  const username = userProperties.getProperty('user-name');
  return username || "Guest";  // Replace with dynamic name
}
/**
 * Retrieves the HTML content for the menu page.
 * @return {HtmlOutput} The HTML content of the menu page.
 */
function getMenuPage() {
  return HtmlService.createHtmlOutputFromFile('menu').getContent();
}

/**
 * Retrieves the HTML content for the menu page.
 * @return {HtmlOutput} The HTML content of the menu page.
 */
function getedit_contacts() {
  return HtmlService.createHtmlOutputFromFile('edit_contacts').getContent();
}

/**
 * Retrieves the HTML content for the menu page.
 * @return {HtmlOutput} The HTML content of the menu page.
 */
function getPrintPage() {
  return HtmlService.createHtmlOutputFromFile('print').getContent();
}

/**
 * Retrieves the HTML content for the registration page.
 * @return {HtmlOutput} The HTML content of the registration page.
 */
function getRegistrationPage() {
  return HtmlService.createHtmlOutputFromFile('registration').getContent();
}

/**
 * Retrieves the HTML content for the login page.
 * @return {HtmlOutput} The HTML content of the login page.
 */
function getLoginPage() {
  return HtmlService.createHtmlOutputFromFile('index').getContent();
}

function getIndex() {
  return HtmlService.createHtmlOutputFromFile('index').getContent();
}

function getUPg() {
  return HtmlService.createHtmlOutputFromFile('user').getContent();
}

/**
 * Registers a new user by adding their credentials to the spreadsheet.
 * Throws an error if the user already exists.
 * @param {string} email - The new user's email.
 * @param {string} password - The new user's password.
 */
function registerNewUser(email, password) {
  // Open the spreadsheet using its ID
  const ss = SpreadsheetApp.openById('1f13jrA8DtDWpjpWgxuBSV98_vrkMyIy9vVBnyYuJ_D0');
  // Access the specific sheet where credentials are stored
  const sheet = ss.getSheetByName('Bệnh nhân');
  // Retrieve all data from the sheet
  const data = sheet.getDataRange().getValues();

  // Check if the email already exists in the spreadsheet
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] == email) {
      throw new Error('User already exists');
    }
  }
  // Append the new user's email and password to the spreadsheet
  sheet.appendRow([email, password]);
}

// This function handles adding or editing a contact
function addOrEditContact(name, email, phone) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Bệnh nhân'); // Adjust the sheet name if needed
  const data = sheet.getDataRange().getValues(); // Get all data from the sheet

  // Check if the contact with the same name already exists
  for (let i = 1; i < data.length; i++) {
    if (data[i][0].toLowerCase() === name.toLowerCase()) {
      // If contact exists, update the existing contact
      sheet.getRange(i + 1, 2).setValue(email);  // Update email
      sheet.getRange(i + 1, 3).setValue(phone);  // Update phone number
      return 'Contact updated successfully!';
    }
  }

  // If contact doesn't exist, add a new contact to the sheet
  sheet.appendRow([name, email, phone]);
  return 'Contact added successfully!';
}

// This function is used to retrieve contacts from the sheet for editing
function getContacts() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Bệnh nhân');
  const data = sheet.getDataRange().getValues();

  // Skip the first row as it contains headers
  const contacts = [];
  for (let i = 1; i < data.length; i++) {
    contacts.push({ name: data[i][0], email: data[i][1], phone: data[i][2] });
  }

  return contacts;
}
