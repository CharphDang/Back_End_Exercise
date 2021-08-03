const hello = require('./hello');

const { getName, setName } = require('./word');
hello();

setName('dangchaofeng');
const name = getName();
console.log(name);
