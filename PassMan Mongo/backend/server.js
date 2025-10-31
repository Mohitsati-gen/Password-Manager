const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const cors = require('cors');  // it gives the security to our app

dotenv.config();

// connecting url
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'PassMan';

const app = express();
const port = 3000;

app.use(express.json()); // ✅ modern way  =  this is a modern way instead of using body-parser
app.use(cors());


  client.connect();

  const db = client.db(dbName);
  const collection = db.collection('documents');

  // getting the  password 
  app.get('/', async (req, res) => {
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  });

  // saving  the password
  app.post('/', async (req, res) => {
    const password = req.body;
    const result = await collection.insertOne(password);
    res.send({ success: true, result:password});
  });

  // deleting the  password
  app.delete('/', async (req, res) => {
    const password = req.body;
    const result = await collection.deleteOne(password);
    res.send({ success: true, result:password});
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

