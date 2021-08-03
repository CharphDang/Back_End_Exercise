// 创建
const buf1 = Buffer.alloc(10);
const buf2 = Buffer.from([10, 20, 30]);
const buf3 = Buffer.from('Buffer创建方法');

console.log(buf1);
console.log(buf2);
console.log(buf3);
console.log(buf3.toString());

// 写入
buf1.write('hello');

// 合并
const buf4 = Buffer.concat([buf1, buf3]);

// 读取
console.log(buf4.toString());
