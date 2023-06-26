# Explanation:
## About_Banks
#### In this project, I have used *express.js* for ceating API server, *csv-parser* for parsing the CSV file and *fs* module for file system operations.
- CSV file is read using *fs.createReadStream*. First data is piped into csv-parser which parses it and emits an event 'data' for each row.<br>
- Then each row is pushed into an array.<br>
- After processing all the data, end event is emitted.<br>

#### Three endpoints have been defined using get method: 
- '/' Home Page
- '/banks' which gives list of all the banks and their branches.<br>
  * From the created array, list of unique bank names are extracted.
  * The list of unique bank names are then iterated and for each bank there is a button called view branches. The button is having a 'toogle-button' and 'onclick' event to toggle the visibility of the branches list.
  * Another list is added to each bank name, and then branches for each current bank are filtered from the list of all banks (first list).
- 'branches/:branch' which is used to search for specific branches.
  * Search term is extracted from the req parameter
  * Matching the branch name, array is filtered using filter method.
  * If no results are found, No results found are send as response.
  * Else search results are iterated and for each result, a table row is added with table data for each field of the banks.

### Time Taken - A day
