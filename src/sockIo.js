/*
*
*
* */

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(3001);
// WARNING: app.listen(80) will NOT work here!

// app.use(require('express').static('public')) 把public目录设置为静态资源目录

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/sockIo.html');
    // res.redirect("/sockIo.html") 重定向
});


// 监听了用户连接的事件
/*
*  socket.emit 表示的是触发某一个事件，如果需要给浏览器发数据，需要触发浏览器注册的某个事件
* socket.on 表示的是注册某个事件，如果我需要获取浏览器的数据，需要注册一个事件，等待浏览器的触发
* */
io.on('connection', (socket) => {
    // socket.emit 方法表示给浏览器发送数据 参数1：事件的名字
    socket.emit('send', { name: 'world' });
    socket.on('login', (data) => {
        io.emit('addUser', data);
        // socket.broadcast.emit('news1', data);
    });
    // socket.userName = 'name' 可以存储当前用户的个人信息

    socket.on('success', data => {
        console.log(`${data.name}加入群聊成功`)
    })

    socket.on("file", data => {
    //    广播给所有用户
        io.emit("userImage", data)
    })

    // 监听用户断开连接
    io.on("disconnect", function () {
        // 用户断开了连接
        console.log('断开连接')
        // io.emit("user disconnected")
    })
});

/*
  socket.emit() 给当前用户发送消息
* io.emit() 给所有的用户发送消息
* */
//