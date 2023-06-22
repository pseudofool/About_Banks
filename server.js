const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();

// reading csv file
let bankBranches = [];
fs.createReadStream('bank_branches.csv')
  .pipe(csv())
  .on('data', (data) => bankBranches.push(data))
  .on('end', () => {
    console.log('CSV file prcessed successfully...');
  });


// home page
app.get('/', (req,res) => {
  res.send(
    "<h1>Bank list: </h1>/banks \n <h1>Specific branch search: </h1>/branches/[branch-name]"
    );
});


// List of banks
app.get('/banks', (req, res) => {
  const bankList = bankBranches.map((branch) => branch.bank_name);
  // remove duplicates
  const uniqueBankList = [...new Set(bankList)];

  let htmlResponse = '<h2>List of Banks</h2>';
  uniqueBankList.forEach((bank) => {
    htmlResponse += `<h3>${bank}</h3>`;
    htmlResponse += `<button class="toggle-button" onclick="toggleBranches(this)">View Branches</button>`;
    htmlResponse += `<ul class="branches-list hidden">`;

    const branches = bankBranches
      .filter((branch) => branch.bank_name === bank)
      .map((branch) => branch.branch);

    branches.forEach((branch) => {
      htmlResponse += `<li>${branch}</li>`;
    });

    htmlResponse += `</ul>`;
  });

  // toggle
  htmlResponse += `
    <script>
      function toggleBranches(button) {
        var branchesList = button.nextElementSibling;
        branchesList.classList.toggle("hidden");
      }
    </script>
  `;

  // hide branches
  htmlResponse += `
    <style>
      .hidden {
        display: none;
      }
    </style>
  `;

  res.send(htmlResponse);
});



  

// searching for specific branch
app.get('/branches/:search', (req, res) => {
  const searchTerm = req.params.search.toLowerCase();

  const searchResults = bankBranches.filter(
    (branch) => branch.branch.toLowerCase() === searchTerm
  );

  if (searchResults.length === 0) {
    res.send('<p>No results found.</p>');
  } else {
    let htmlResponse = '<h2>List of all the Branches</h2>';
    htmlResponse += '<table>';
    htmlResponse += '<tr><th>IFSC</th><th>Bank ID</th><th>Branch</th><th>Address</th><th>City</th><th>District</th><th>State</th><th>Bank Name</th></tr>';

    searchResults.forEach((result) => {
      htmlResponse += `<tr><td>${result.ifsc}</td><td>${result.bank_id}</td><td>${result.branch}</td><td>${result.address}</td><td>${result.city}</td><td>${result.district}</td><td>${result.state}</td><td>${result.bank_name}</td></tr>`;
    });

    htmlResponse += '</table>';
    res.send(htmlResponse);
  }
});
  

const port = 3000;
app.listen(port, (err) => {
  if(err){
     console.log('Error in starting server', err);
     return;
  }
  console.log(`Server is running on port ${port}`);
});
