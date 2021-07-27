const { promisify } = require('util')
module.exports.clone = async function (repo, desc, option) {
  // * 专门下载clone git repository
  const download = promisify(require('download-git-repo'))
  // * 实现 node 命令行环境中的 loading 效果
  const ora = require('ora')
  const process = ora(`Downloading .....${repo}`)
  process.start()
  await download(repo, desc, option)
  process.succeed()
}

// utils/clone.js
// const download = require('download-git-repo')
// const symbols = require('log-symbols') // 用于输出图标
// const ora = require('ora') // 用于输出loading
// const chalk = require('chalk') // 用于改变文字颜色
// module.exports.clone = function (remote, name, option) {
//   const downSpinner = ora('正在下载模板...').start()
//   return new Promise((resolve, reject) => {
//     download(remote, name, option, err => {
//       if (err) {
//         downSpinner.fail()
//         console.log(symbols.error, chalk.red(err))
//         reject(err)
//         return
//       }
//       downSpinner.succeed(chalk.green('模板下载成功！'))
//       resolve()
//     })
//   })
// }
