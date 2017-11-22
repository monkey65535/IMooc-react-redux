const express = require('express');
const userRouter = require('./user.js');

//创建express实例
const app = express();
app.use('/user', userRouter);
app.get('/', (req, res) => '<h1>Hello express</h1>');
//监听端口9093
app.listen(9093, function () {
    console.log('Node app start at port 9093')
});
