function doGet(e) {
  var sheetName = (e && e.parameter && e.parameter.sheet) || 'Profile';
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);

  var output;
  if (!sheet) {
    output = { error: 'Sheet not found: ' + sheetName };
  } else if (sheetName === 'Discography') {
    output = readDiscography(sheet);
  } else if (sheetName === 'Schedule') {
    output = readSchedule(sheet);
  } else {
    output = readProfile(sheet);
  }

  return ContentService
    .createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

function readProfile(sheet) {
  var rows = sheet.getDataRange().getValues().slice(1);
  return rows
    .filter(function (row) { return String(row[0]).trim() !== ''; })
    .map(function (row) {
      return {
        name: row[0],
        nameEN: row[1],
        fullNameTH: row[2],
        fullNameEN: row[3],
        generation: row[4],
        team: row[5],
        birthday: row[6],
        like: row[7],
        bloodType: row[8],
        oshiMark: row[9],
        province: row[10],
        hobby: row[11],
        instagram: row[12],
        image: row[13],
        imageAlt: row[13]
      };
    });
}

function readSchedule(sheet) {
  var rows = sheet.getDataRange().getValues().slice(1);
  return rows
    .filter(function (row) { return String(row[3]).trim() !== ''; })
    .map(function (row) {
      return {
        date: row[0],
        time: row[1],
        type: row[2],
        title: row[3],
        place: row[4],
        link: row[5]
      };
    });
}

function readDiscography(sheet) {
  var rows = sheet.getDataRange().getValues().slice(1);
  return rows
    .filter(function (row) { return String(row[2]).trim() !== ''; })
    .map(function (row) {
      return {
        type: row[0],
        release: row[1],
        songName: row[2],
        image: row[3],
        link: row[4]
      };
    });
}
