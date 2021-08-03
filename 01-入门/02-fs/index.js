const fs = require('fs');
const { promisify } = require('util');
// const util = require('util');
// console.log(util);

// 异步获取文件
// fs.readFile('./readme.md', (err, data) => {
//   console.log(data);
//   console.log(data.toString());
// });

// 同步获取文件
// const data = fs.readFileSync('.//readme.md');
// console.log('data', data);

// 封装promise
// const p = new Promise((resolve, reject) => {
//   fs.readFile('./readme.md', (err, data) => {
//     if (err) {
//       reject(err);
//     } else {
//       resolve(data);
//     }
//   });
// });
// p.then(data => {
//   console.log(data);
//   console.log(data.toString());
// });

// 使用工具类封装为promise方式
const readFileByPro = promisify(fs.readFile);
readFileByPro('./readme.md').then(data => {
  console.log(data.toString());
});
