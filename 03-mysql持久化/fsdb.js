const fs = require('fs');
function get(key) {
  fs.readFile('./fsdb.json', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const jsonData = JSON.parse(data);
    console.log(jsonData[key]);
  });
}

function set(key, val) {
  fs.readFile('./fsdb.json', (err, data) => {
    const jsonData = data ? JSON.parse(data) : {};
    jsonData[key] = val;
    fs.writeFile('./fsdb.json', JSON.stringify(jsonData), (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log('写入成功');
    });
  });
}

// 命令行接口部分
const readline = require('readline');
// 创建接口，输入是std + 'in' 输出是 std + 'out'
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', input => {
  const [op, key, value] = input.split(' ');
  if (op === 'get') {
    get(key);
  } else if (op === 'set') {
    set(key, value);
  } else if (op === 'quit') {
    rl.close();
  } else {
    console.log('没有该操作');
  }
});

rl.on('close', function() {
  console.log('程序结束');
  process.exit(0);
});
