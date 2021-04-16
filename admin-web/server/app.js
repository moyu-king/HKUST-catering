const express = require('express');
const path = require('path');
const user = require('./routers/user')
const master = require('./routers/master')
const app = express();

//开放静态资源
app.use('/static', express.static(path.join(__dirname, '/uploads')));

//把路由容器挂载到app服务中
app.use(user)
    .use(master)


app.listen(8000, () => console.log("服务器启动成功，可通过http://127.0.0.1:8000访问"))