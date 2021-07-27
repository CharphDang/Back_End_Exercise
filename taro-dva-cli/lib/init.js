const { figlet, clear, log, logError, spawn } = require('./utils')
const { clone } = require('./download')

const GIT_LAB_URL = 'direct:https://gitee.com/chaofengdang/taro-dva-template.git'

module.exports = async name => {
  // 打印欢迎画面
  clear()
  const data = await figlet('Taro Dva')
  log(data)
  log('🚀 Create Project:' + name)
  try {
    await clone(GIT_LAB_URL, name, { clone: true })
  } catch (error) {
    logError(error, 'err') // Charph-log
    return
  }

  log('⬇️  Download Template Success')

  // ------------------------------------

  log('')
  const ora = require('ora')
  const process = ora(`🚘 Install Dependences ...`)
  process.start()
  try {
    await spawn('npm', ['install'], { cwd: `./${name}` })
    process.succeed()
  } catch (error) {
    process.fail()
    logError(error, 'err') // Charph-log
    return
  }

  log(`
      👌 安装完成：
      To get Start:
      ===========================
      cd ${name}
      yarn dev:weapp
      or
      npm run dev:weapp
      ===========================
      `)

  // 打开浏览器
  // open(`http://localhost:8080`)
  // await spawn('npm', ['run', 'serve'], { cwd: `./${name}` })
}
