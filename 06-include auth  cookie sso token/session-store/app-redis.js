const koa = require('koa')
const app = new koa()
const session = require('koa-session')

const redisStore = require('koa-redis')
const redis = require('redis')
const redisClient = redis.createClient(6379, 'localhost')

// co- 开头的库，都是将API转换为Promise的库
const wrapper = require('co-redis')
const client = wrapper(redisClient)

// 用来加密使用
app.keys = ['some secret']
// 不配置store的时候，默认存储在运行内存中，重启服务器就会丢失
const SESS_CONFIG = {
  key: 'kkb:sess', // 名
  store: redisStore({ client })
}
// 启用session中间件
app.use(session(SESS_CONFIG, app))

app.use(ctx => {
  // 查看redis
  redisClient.keys('*', (err, keys) => {
    console.log('keys:', keys)
    keys.forEach(key => {
      redisClient.get(key, (err, val) => {
        console.log(val)
      })
    })
  })

  if (ctx.path === '/favicon.ico') return
  let n = ctx.session.count || 0
  ctx.session.count = ++n
  ctx.body = '第' + n + '次访问'
})
app.listen(3000)
