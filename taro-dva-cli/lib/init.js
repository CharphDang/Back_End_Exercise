// * 这是一个内置工具库中的函数， 用来将方法的返回值变成Promise类型
const { promisify } = require('util')
// * 使用figlet 工具可以将message 转化为空心的字体， 一般用来制作程序启动时的banner
const figlet = promisify(require('figlet'))
// * 清屏
const clear = require('clear')
// * 控制台打印彩色字体
const chalk = require('chalk')
// * 封装log方法，打印绿色字体
const log = content => console.log(chalk.green(content))

const { clone } = require('./download')

// promisiy化spawn
// 对接输出流
const spawn = async (...args) => {
  const { spawn } = require('child_process')
  return new Promise(resolve => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', () => {
      resolve()
    })
  })
}

module.exports = async name => {
  // 打印欢迎画面
  clear()
  const data = await figlet('KKB Welcome')
  log(data)
  log('Create Project:' + name)
  // await clone('https://gitee.com/chaofengdang/taro-dva-template.git', name)
  log('Download Template Success')

  // ------------------------------------

  log('安装依赖')
  await spawn('npm', ['install'], { cwd: `./${name}` })
  log(
    chalk.green(`
      👌安装完成：
      To get Start:
      ===========================
      cd ${name}
      yarn dev:weapp
      ===========================
      `)
  )
}
