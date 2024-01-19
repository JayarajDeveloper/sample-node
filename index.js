// index.js
const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
const app = express();
const port = 3009;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const existingEnv = {
    DB_HOST: process.env.DB_HOST || '',
    DB_NAME: process.env.DB_NAME || '',
    DB_USER: process.env.DB_USER || '',
    DB_PASS: process.env.DB_PASS || '',
    DB_PORT: process.env.DB_PORT || '',
    API_PORT: process.env.API_PORT || '',
    AWS_REGION: process.env.AWS_REGION || '',
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY || '',
    AWS_ACCESS_SECRET: process.env.AWS_ACCESS_SECRET || '',
    SQS_QUEUE_LOCAL2GLOBAL: process.env.SQS_QUEUE_LOCAL2GLOBAL || '',
    rds_host: process.env.rds_host || '',
    rds_dbName: process.env.rds_dbName || '',
    GDB_HOST: process.env.GDB_HOST || '',
    GDB_NAME: process.env.GDB_NAME || '',
    SECRET_MANAGER_NAME: process.env.SECRET_MANAGER_NAME || '',
    mid: process.env.mid || '',
    S3BUCKET_NAME: process.env.S3BUCKET_NAME || '',
    ASSETS_URL: process.env.ASSETS_URL || '',
    ASSET_FOLDER: process.env.ASSET_FOLDER || '',
    LAMBDA_URL: process.env.LAMBDA_URL || '',
    SQL_SERVERID1: process.env.SQL_SERVERID1 || '',
    SQL_SERVERID2: process.env.SQL_SERVERID2 || '',
    SQL_SERVERID3: process.env.SQL_SERVERID3 || '',
    ONE_BOTTLE_VALUE: process.env.ONE_BOTTLE_VALUE || '',
    BARCODE_DESCRIPTION1: process.env.BARCODE_DESCRIPTION1 || '',
    BARCODE_DESCRIPTION2: process.env.BARCODE_DESCRIPTION2 || '',
  };
  res.render('index', { existingEnv });
});

app.post('/', (req, res) => {
  const formData = req.body;
  console.log('Received form data:', formData);

  try {
    const updatedEnv = { ...process.env, ...formData };
    const envData = Object.entries(updatedEnv)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    fs.writeFileSync('.env', envData);
    dotenv.config();
    res.send('Environment variables created successfully!');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});

