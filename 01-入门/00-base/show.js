const os = require('os');

module.exports = {
  showMemory() {
    const mem = ((os.totalmem() - os.freemem()) / os.totalmem()) * 100;
    console.log(`内存占用率${mem.toFixed(2)}`);
  },
  showCpu() {
    const cpuStat = require('cpu-stat');
    cpuStat.usagePercent((err, percent) => {
      console.log(`cpu占用率：${percent.toFixed(2)}`);
    });
  },
  showPlatform() {
    console.log(`编译时的操作系统名：${os.platform()}`);
  },
  showType() {
    console.log(`操作系统类型：${os.type()}`);
  }
};
