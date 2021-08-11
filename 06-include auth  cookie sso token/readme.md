# 鉴权

### 目录列表内容讲解

1. session 目录中是使用koa-session中间件来实现的一套登录练习
2. session-store 是在session的基础上，增加持久化存储的机制， 使用redis来存储session状态
3. token 是在jwt的基础上，利用koa-jwt中间件实现的一套token鉴权练习
4. sso是单点登录的练习，实际还是通过token和cookie的机制
  - 不同域名之间会先走一个redirect重定向到 认证登录 页面来判断是否登录
5. oauth是github的第三方授权练习

### 收获

1. session 鉴权
  - session 基于cookie 的， cookie 基于浏览器的
  - 导致 session 有些弊端
    - 服务器有状态，哪怕是通过redis存储，那也是有状态的，假设没有通过redis存储登录态，那服务器重启后，页面上所有的登录态都会消失，全部401重新登录。
    - 不够灵活， 跨域了还得专门设置才能传递cookie


2. token 鉴权
  - 服务器没有状态，服务器重启之后，页面的登录态并不会消失，不用重新登录
  - jwt token

> 注意： Koa-session的内部实现是一个变体，没有指定store的时候是将内容序列化后存在前端的cookie上，服务器重启后，拿到cookie进行解密后，依然可以拿到登录态。