const express = require('express');
const db = require('./models');

const app = express();
const port = 3030;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const route = require('./routes/router.js');
route(app);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log('App server at ' + port);
  });
});
