# node-jwt

nodejs + express + mongodb + vue3
实现jwt登录

## 目录

```bash
root/
├─ src/ # node server code
│  ├─ api/ # node api
│  │  ├─ login/ # /login登录接口
│  │  │  └─ ...
│  ├─ db/ # 数据库连接
│  ├─ models/ # 
│  │  ├─ User/ # 
│  │  └─ / # 
│  └─ app.js/ # node 入口文件
├─ public/ # 前端文件：入口文件，配置，第三方包，不走编译
│  ├─ views/ # vue路由页面
│  ├─ js/ # 前端js
│  │  ├─ lib/ # /第三方js库
│  │  └─ ... 
│  ├─ styles/ # 样式文件
│  ├─ app_config.js # 项目默认配置，接口默认地址
│  └─ index.html # 前端入口文件
├─ package.json  # 项目依赖配置
└─ ...
```


## todo 

- [x] 用户注册：mongodb数据库，密码md5加密 —— blueimp-md5、mongoose
- [x] 登录
- [x] 登录添加captcha图片验证 —— svg-captcha
- [x] 生成token —— jsonwebtoken
- [x] 校验verifyToken
- [x] 获取用户信息
- [x] token过期退出
- [ ] 更新refreshToken
- [x] websocket:建立长连接，断开连接/断开重连，消息通讯（Client→Server,Server→Client）
- [x] websocket:消息保存，预读取最近10条
- [ ] websocket:频道? ws库
 

## 添加vue-ssr 渲染