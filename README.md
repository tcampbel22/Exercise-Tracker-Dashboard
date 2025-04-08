<h1 align="center" id="title">Exercise-Tracker-Dashboard</h1>

<p id="description">Leverages Google Cloud Platform to sanitise and present inputted exercise in Looker</p>

<img src="https://github.com/tcampbel22/Exercise-Tracker-Dashboard/blob/master/assets/Screenshot%20from%202025-04-08%2020-32-37.png?raw=true" align="center">

## About

This exercise tracking app integrates with Google Sheets to manage and process workout data. It leverages a Google Apps Script to automate the handling of form submissions, parse the data, and prepare it for visualization on a Looker dashboard.

### Key Features:
- **Form Data Handling**: The script automatically processes form submissions received through Google Sheets. It extracts the submitted data, which includes user information and workout details, and organizes it into respective sheets based on the user's email.
- **Data Parsing**: The system parses the raw form data, ensuring it is cleaned and structured appropriately for later analysis. The data is separated into two sheets: a **Raw Data** sheet for storage and a **Tracker Sheet** for specific user details.
- **Conditional Logic**: The script applies conditional logic to decide which data to place in the final sheet. This is based on form responses, allowing for custom entry based on specific user inputs (e.g., workout type or intensity).
- **Automation for Looker Dashboard**: The prepared data is structured to easily integrate with Looker, providing seamless visualization for tracking exercise metrics like workout types, intensity, and duration.

### Workflow:
- User submits form with workout data
- Google Sheets stores form data
- Data is parsed for email and workout details
- Map email to user-specific tracker sheet
- Insert parsed data into the appropriate tracker sheet
- Apply conditional logic for column insertion based on form data
- Data structured and ready for Looker dashboard visualization

<h2>💻 Built with</h2>

Technologies used in the project:

*   Apps Script
*   Sheets, Forms & Looker
