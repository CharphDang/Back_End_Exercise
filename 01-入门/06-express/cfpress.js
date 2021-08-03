const http = require('http');
const url = require('url');

console.log(url, '---------->url');

class CfApplycation {
  constructor() {
    this.routers = [];
  }
  get(path, handler) {
    this.routers.push({
      path: path,
      method: 'get',
      handler
    });
  }
  post(path, handler) {
    this.routers.push({
      path: path,
      method: 'post',
      handler
    });
  }
  listen(...args) {
    const server = http.createServer((req, res) => {
      let { pathname } = url.parse(req.url, true);
      //   console.log(req.url, '-------', pathname);
      const curRouter = this.routers.find(router => {
        const { path, method } = router;
        return pathname === path && req.method.toLowerCase() === method;
      });
      curRouter && curRouter.handler(req, res);
    });
    server.listen(...args);
  }
}

module.exports = function() {
  return new CfApplycation();
};
