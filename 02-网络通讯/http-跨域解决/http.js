// 启用3000端口，可以使用live-server直接启用新的，默认为8080端口
const http = require('http');
const fs = require('fs');

http
  .createServer((req, res) => {
    const { method, url } = req;
    console.log(method, '>>>>>>>>method');
    console.log(req.headers.cookie, '>>>>>>>>cookie');
    if (method == 'GET' && url == '/') {
      fs.readFile('./index.html', (err, data) => {
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
      });
    } else if (method == 'GET' && url == '/users') {
      setHeader(res);
      res.setHeader('Set-Cookie', ['name=dangchaofeng', 'age=26']);
      resEndJson(res);
    } else if (method == 'OPTIONS' && url == '/users') {
      setHeader(res);
      res.end();
    }
  })
  .listen(3000);
function setHeader(res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  res.setHeader('Access-Control-Allow-Headers', 'X-Token');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
}
function resEndJson(res) {
  res.end(JSON.stringify([{ name: 'tom', age: 20 }]));
}
