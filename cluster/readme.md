# node集群来守护进程

> cluster.js 中 利用集群来守护node 后台进程

- 正常情况下，node app.js来启用后台程序，如果访问内部出错，进程会中断，所以我们需要守护进程
- 真实项目中，使用pm2来启用node后台，pm2来守护进程，pm2 命令参数省略，直接使用process.yml来配置，然后pm2 start process.yml 即可