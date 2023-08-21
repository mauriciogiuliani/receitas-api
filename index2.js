


const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors);



app.get('/health', (req, res) => {
  res.send('Server is up and running');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

// setup aws credentials
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = 'ftv-matches';

// get request to get all users
app.get('/users', (req, res) => {
  const params = {
    TableName: tableName,
  };

  dynamodb.scan(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Could not load items: ' + err.message });
    } else {
      res.json(data.Items);
    }
  });
});

// get request to get a single user
app.get('/users/:id', (req, res) => {
  const params = {
    TableName: tableName,
    Key: {
      id: req.params.id,
    },
  };

  dynamodb.get(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Could not load items: ' + err.message });
    } else {
      res.json(data.Item);
    }
  });
});