const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const { url, method, headers } = req;
  console.log(url);
  console.log(headers.accept);
  if (url === '/' && method === 'GET') {
    const html = fs.readFileSync('./index.html');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html;application/json;');
    res.end(html);
  } else if (
    url === '/img.jpg' &&
    method === 'GET' &&
    headers.accept.includes('image/*')
  ) {
    fs.createReadStream('.' + url).pipe(res);
  } else {
    res.writeHead(500, {
      'Content-Type': 'text/plain;charset=utf-8'
    });
    res.end('服务器错误');
  }
});

server.listen(4000);
