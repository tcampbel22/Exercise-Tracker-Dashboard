function fillMissingDates() {
  Utilities.sleep(10000); // Wait for 10 seconds

  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const rawDataSheet = sheet.getSheetByName('Raw Data');
  const resultSheet = sheet.getSheetByName('Sanitised Data');

  const rawData = rawDataSheet.getDataRange().getValues();
  const dateColumn = 0;        // Assuming date is in column A
  const nameColumn = 5;        // Assuming name is in column F
  const durationColumn = 7;    // Assuming duration is in column H
  const typeColumn = 3;        // Assuming type is in column D
  const intensityColumn = 6;   // Assuming intensity is in column G
  const weekColumn = 8;

  // Get unique dates from the Raw Data (no duplicates)
  const datesSet = new Set();
  rawData.forEach(row => {
    // Convert the date from Raw Data into a Date object to ensure proper comparison
    const dateValue = new Date(row[dateColumn]);
    if (!isNaN(dateValue)) { // Make sure it's a valid date
      datesSet.add(dateValue);
    }
  });

  // Convert the set to an array of dates and sort it
  const dates = Array.from(datesSet).sort((a, b) => a - b);

  // Get the first and last date in the 'Raw Data' sheet
  const firstDate = dates[0];
  const lastDate = dates[dates.length - 1];

  // Create an array of all dates within the range of firstDate and lastDate
  let allDates = [];
  let currentDate = new Date(firstDate);
  while (currentDate <= lastDate) {
    allDates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
  }
  const today = new Date();
  const todayDateString = today.toDateString();
  if (!allDates.some(date => date.toDateString() === todayDateString)) {
    allDates.push(today);
  }

  // Clear the result sheet (start fresh)
  resultSheet.clear();

  // Add headers to the Result Sheet (optional)
  resultSheet.appendRow(["Date", "Name", "Duration", "Type", "Intensity", "Week"]);

  // Iterate through all dates and add the corresponding data (or blank if not found)
  allDates.forEach(date => {
    const matchingRows = rawData.filter(row => {
      // Convert the date from Raw Data into a Date object for comparison
      const rawDate = new Date(row[dateColumn]);
      return rawDate.toDateString() === date.toDateString(); // Compare dates without time
    });
    
    if (matchingRows.length > 0) {
      // If there are multiple entries for the same date
      matchingRows.forEach(matchingRow => {
        resultSheet.appendRow([matchingRow[dateColumn], matchingRow[nameColumn], matchingRow[durationColumn], matchingRow[typeColumn], matchingRow[intensityColumn], matchingRow[weekColumn]]);
      });
    } else {
      // Add row with blank data if no matching entry for this date
      resultSheet.appendRow([date, '', '', '', '', '']);
    }
  });
}
