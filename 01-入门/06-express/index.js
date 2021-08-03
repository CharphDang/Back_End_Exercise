// const express = require('express');
const express = require('./cfpress');

const app = express();

app.get('/', (req, res) => {
  res.end('Hello World');
});
app.get('/user', (req, res) => {
  res.end(
    JSON.stringify({
      name: 'dangchaofeng'
    })
  );
});

app.listen(12345, () => {
  console.log('服务已启动，端口为：12345');
});

console.log(app);
