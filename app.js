const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

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
      console.log('Data from JSON file:', result);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });
});

// Endpoint to add new data
app.post('/products', (req, res) => {
  const newItem = req.body;
  data.push(newItem);
  res.status(201).json(newItem);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});