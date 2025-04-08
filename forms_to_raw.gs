function onFormSubmit(e) {
  Utilities.sleep(5000);
  // Map emails to their respective sheets
  var emailToSheet = {
    "tcampbel22@gmail.com": "Tim Tracker",
    "parramartinraul@gmail.com": "Raul Tracker",
    "saim_han@hotmail.com": "Markus Tracker",
  };

  // Get the submitted form data
  var formdata = e.values; // Array of form responses
  var email = formdata[1]; // Assuming the email is in the second column (index 1)

  // Find the target sheet for the email
  var dataSheetName = "Raw Data";
  var targetSheetName = emailToSheet[email];
  if (!targetSheetName) 
  {
    Logger.log("No matching sheet for email: " + email);
    return; // Exit if no matching email is found
  }

  // Get the target sheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = spreadsheet.getSheetByName(dataSheetName);
  var targetSheet = spreadsheet.getSheetByName(targetSheetName);
  if (!targetSheet) 
  {
    Logger.log("Sheet not found: " + targetSheetName);
    return; // Exit if the sheet is not found
  }

  // Determine the next available row (starting from row 3)
  var lastRow = getLastRowInRange(targetSheet, 1, 4);
  var lastRowRaw = getLastRowInRange(dataSheet, 1, 8);
  var nextRow = lastRow + 1;
  var nextRowRaw = lastRowRaw + 1;
  if (nextRow < 3) 
  {
    nextRow = 3; // Ensure we start from row 3
  }

  // Place values into respective columns
  targetSheet.getRange(nextRow, 3).setValue(formdata[2]); // Column C
  targetSheet.getRange(nextRow, 2).setValue(formdata[3]); // Column B
  targetSheet.getRange(nextRow, 4).setValue(formdata[4]); // Column D

  dataSheet.getRange(nextRowRaw, 3).setValue(formdata[1]); // emails
  dataSheet.getRange(nextRowRaw, 4).setValue(formdata[2]); //workout type
  dataSheet.getRange(nextRowRaw, 7).setValue(formdata[3]); //intensity
  dataSheet.getRange(nextRowRaw, 8).setValue(formdata[4]); // duration

  // Conditional logic for Column A
  if (formdata[6]) 
  { // If formdata[5] is not empty
    targetSheet.getRange(nextRow, 1).setValue(formdata[6]); // Column A
    dataSheet.getRange(nextRowRaw, 2).setValue(formdata[6]);
  } 
  else 
  {
    targetSheet.getRange(nextRow, 1).setValue(formdata[0]); // Column A
    dataSheet.getRange(nextRowRaw, 2).setValue(formdata[0]);
  }
}

function getLastRowInRange(sheet, startColumn, endColumn) 
{
    const range = sheet.getRange(1, startColumn, sheet.getLastRow(), endColumn - startColumn + 1);
    const values = range.getValues(); // Get all values in the range

    for (let i = values.length - 1; i >= 0; i--) {
        if (values[i].some(cell => cell !== "")) {
            return i + 1; // Return the 1-based row index
        }
    }
    return 0; // Return 0 if the range is empty
