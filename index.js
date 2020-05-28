const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");


const db = mysql.createConnection({
  host: 'localhost',
  user: 'webshop',
  password: '123456',
  database: 'webshopDB',
  multipleStatements: true
});

db.connect();


function startwebServer() {
  const app = express();
  app.use(bodyParser.json());
  
  app.get('/api/flowers', (req, res) => {
    const sql = 'SELECT * FROM flowers';
    
    db.query(sql, (err, result) => {
      if(err) throw err;
      res.send(result);
    });
  });

  app.get('/api/flowers/:flowerId', (req, res) => {
    const sql = `SELECT * FROM flowers WHERE id=${req.params.flowerId}`;
    
    db.query(sql, (err, result) => {
      if(err) throw err;
      res.send(result[0]);
    });
  });

  app.get('/api/flower-search/:partialFlower', (req, res) => {
    const sql = `SELECT * FROM flowers WHERE title LIKE '%${req.params.partialFlower}%'`;
    
    db.query(sql, (err, result) => {
      if(err) throw err;
      res.send(result);
    });
  });

  app.get('/api/flower-titles', (req, res) => {
    const sql = 'SELECT title FROM flowers';
    
    db.query(sql, (err, result) => {
      if(err) throw err;
      res.send(result);
    });
  });

  app.post('/api/shopping-cart', async (req, res) => {
    let body = await req.body;
    let flowerId = body.flowerId;

    const sql = `INSERT INTO shopping_cart(flower_id) VALUES (${flowerId})`;

    db.query(sql, (err, result) => {
      if(err) throw err;
      res.send(result);
    });
  })

  app.delete('/api/shopping-cart', async (req, res) => {
    let body = await req.body;
    let flowerId = body.flowerId;

    const sql = `DELETE FROM shopping_cart WHERE flower_id = ${flowerId} LIMIT 1`;

    db.query(sql, (err, result) => {
      if(err) throw err;
      res.send(result);
    });
  })

  app.get('/api/shopping-cart', async (req, res) => {
    const sql = 'SELECT * FROM shopping_cart';

    db.query(sql, (err, result) => {
      if(err) throw err;
      res.send(result);
    });
  })
  
  app.listen(4001, () => console.log('Listening on port 4001'));
}

startwebServer();