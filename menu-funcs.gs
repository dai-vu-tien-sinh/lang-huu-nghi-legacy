// This function fetches all contacts, including additional fields
function getAllContacts() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Bệnh nhân'); // Ensure correct sheet name
  const data = sheet.getDataRange().getValues(); // Get all data from the sheet (including headers)
  
  const contacts = [];
  
  // Loop through all rows (skipping the header row)
  for (let i = 1; i < data.length; i++) {
    const contact = {
      id_benh_nhan: data[i][0] || 'N/A', // ID bệnh nhân (use 'N/A' if empty)
      id_gia_dinh: data[i][1] || 'N/A', // ID gia đình
      id_che_do_chinh_sach: data[i][2] || 'N/A', // ID chế độ chính sách
      id_lop_hoc: data[i][3] || 'N/A', // ID lớp học
      id_cac_ho_tro_cua_lang: data[i][4] || 'N/A', // ID các hỗ trợ của làng
      id_benh_an: data[i][5] || 'N/A', // ID bệnh án
      id_danh_gia: data[i][6] || 'N/A', // ID đánh giá
      name: data[i][7] || 'N/A', // Họ và tên
      ngay_sinh: data[i][8] || 'N/A', // Ngày sinh
      gioi_tinh: data[i][9] || 'N/A', // Giới tính
      dia_chi_gia_dinh: data[i][10] || 'N/A', // Địa chỉ gia đình
      so_dinh_danh_ca_nhan: data[i][11] || 'N/A', // Số định danh cá nhân
      doi_tuong_the_he_thu: data[i][12] || 'N/A', // Đối tượng, thế hệ thứ
      ho_khau: data[i][13] || 'N/A', // Hộ khẩu
      ngay_tiep_nhan: data[i][14] || 'N/A', // Ngày tiếp nhận
      ngay_hoa_nhap: data[i][15] || 'N/A' // Ngày hòa nhập
    };
    contacts.push(contact);
  }

  // Return all contacts
  return contacts;
}


// This function performs the search operation
function search(query) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Bệnh nhân'); // Change 'Bệnh nhân' to your actual sheet name
  const data = sheet.getDataRange().getValues(); // Get all data from the sheet (including headers)
  
  const results = [];
  
  // Ensure query is a string and convert to lowercase for case-insensitive comparison
  const searchQuery = (query && query.toString().toLowerCase()) || ''; // Handle query if undefined or null
  
  // Loop through the rows in the sheet starting from the second row (skipping the header row)
  for (let i = 1; i < data.length; i++) {
    // Ensure the name field (data[i][7]) exists and is a string before calling .toString()
    const name = (data[i][7] && data[i][7].toString().toLowerCase()) || ''; // If name is undefined or null, use an empty string

    // If the name contains the search query (case-insensitive), add the result to the 'results' array
    if (name.includes(searchQuery)) {
      const result = {
        id_benh_nhan: data[i][0],
        id_gia_dinh: data[i][1],
        id_che_do_chinh_sach: data[i][2],
        id_lop_hoc: data[i][3],
        id_cac_ho_tro_cua_lang: data[i][4],
        id_benh_an: data[i][5],
        id_danh_gia: data[i][6],
        name: data[i][7],
        ngay_sinh: data[i][8],
        gioi_tinh: data[i][9],
        dia_chi_gia_dinh: data[i][10],
        so_dinh_danh_ca_nhan: data[i][11],
        doi_tuong_the_he_thu: data[i][12],
        ho_khau: data[i][13],
        ngay_tiep_nhan: data[i][14],
        ngay_hoa_nhap: data[i][15]
      };
      results.push(result); // Add the matching result
    }
  }

  // Return the results array to the front-end (HTML page)
  Logger.log(results);
  return results;
}


// This function fetches the family details for a given ID Gia Đình
function getFamilyDetails(idGiaDinh) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Gia đình'); // Ensure correct sheet name
  const data = sheet.getDataRange().getValues(); // Get all data from the sheet (including headers)
  
  let familyDetails = {
    father_name: 'N/A',  // Default values in case data is missing
    mother_name: 'N/A', 
    contact_number: 'N/A',
    father_occupation: 'N/A',
    mother_occupation: 'N/A',
    address: 'N/A',
    guardian_info: 'N/A'
  };

  // Loop through the rows in the "Gia Đình" sheet and find the matching ID Gia Đình
  for (let i = 1; i < data.length; i++) {
    const familyId = data[i][0]; // Assuming ID Gia Đình is in the first column
    if (familyId == idGiaDinh) {
      familyDetails = {
        father_name: data[i][1] || 'N/A',  // Họ và tên bố
        mother_name: data[i][2] || 'N/A',  // Họ và tên mẹ
        contact_number: data[i][3] || 'N/A',  // SĐT liên hệ
        father_occupation: data[i][4] || 'N/A',  // Nghề nghiệp bố
        mother_occupation: data[i][5] || 'N/A',  // Nghề nghiệp mẹ
        address: data[i][6] || 'N/A',  // Địa chỉ
        guardian_info: data[i][7] || 'N/A'  // Thông tin người giám hộ
      };
      break;
    }
  }

  return familyDetails;
}

function exportToExcel() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet1 = ss.getSheetByName("Bệnh nhân"); // Replace with your actual sheet name
  const sheet2 = ss.getSheetByName("Gia đình");  // Replace with your actual sheet name

  // Get data from both sheets
  const dataBnhan = sheet1.getDataRange().getValues();
  const dataGiaDinh = sheet2.getDataRange().getValues();

  // Create a new Google Sheets file to store the data temporarily
  const newSheet = SpreadsheetApp.create("Exported Data");

  // Populate the new file with data from both sheets
  const bnhanSheet = newSheet.getSheetByName("Sheet1");
  bnhanSheet.setName("Bệnh nhân");
  bnhanSheet.getRange(1, 1, dataBnhan.length, dataBnhan[0].length).setValues(dataBnhan);

  const giaDinhSheet = newSheet.insertSheet();
  giaDinhSheet.setName("Gia đình");
  giaDinhSheet.getRange(1, 1, dataGiaDinh.length, dataGiaDinh[0].length).setValues(dataGiaDinh);

  // Convert the new Google Sheets file to Excel (.xlsx) format
  const url = 'https://docs.google.com/spreadsheets/d/' + newSheet.getId() + '/export?format=xlsx';

  // Return the URL to the frontend for automatic download
  return url;
}
