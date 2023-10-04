const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// Sample data (in-memory database)
let result = [];

// Endpoint to get all data
app.get('/products', (req, res) => {
  const fileName = 'db.json';

  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file: ${fileName}`);
      return;
    }
  
    try {
      result = JSON.parse(data);
      res.json(result);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });
});

// Endpoint to add new data
app.put('/products', (req, res) => {
  console.log({req});
  console.log({res});
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});