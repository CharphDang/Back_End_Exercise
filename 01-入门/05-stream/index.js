const fs = require('fs');
const rs = fs.createReadStream('./text1.txt');
// const rs = Buffer.from('自己创建的流'); // 错误，buffer 创建出来的是二进制内存空间，不是流
const ws = fs.createWriteStream('./text2.txt');
console.log(rs);
rs.pipe(ws);
