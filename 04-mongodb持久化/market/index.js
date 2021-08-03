const express = require('express');
const app = express();
const path = require('path');
const mongodb = require('./models/db')();

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./index.html'));
});

app.get('/api/list', async (req, res) => {
  const page = +req.query.page;
  try {
    const col = mongodb.col('fruits');
    const result = await col.find();
    const total = await result.count();
    const fruits = await result
      .skip((page - 1) * 5)
      .limit(5)
      .toArray();

    res.json({
      ok: 1,
      data: {
        fruits,
        pagination: { total, page }
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000);
