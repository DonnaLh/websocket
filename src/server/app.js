var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// var testController = require('./testController');
// app.post('/dataInpute',testController.dataInput);

let userList = []
let userInfo = []


io.on('connection',function(socket) {
    console.log('建立连接')
    //接收数据
    socket.on('login', function (obj) {
        // 发送数据 登录时记录当前人的姓名
        if(!userList.includes(obj.username)){
            userList.push(obj.username)
            // 记录登录者的姓名
            socket.username = obj.username
            socket.img = userList.length
            // 告诉浏览器当前用户的姓名
            socket.emit("sendUserName", {
                username: socket.username,
                img: socket.img
            })
            socket.emit('loginSucess')
            io.emit('updateMsgList', {
                username: obj.username,
                img: userList.length,
                time: new Date().toLocaleString(),
                type: 'join'
            });
            userInfo.push({
                username: obj.username,
                img: userList.length,
            })
            io.emit('userList', userInfo)
        } else {
            socket.emit('loginError');
        }


    });

//    发送消息数据
    socket.on("msg", obj=>{
        // 广播给所有的用户
        io.emit('msg', {
            username: socket.username, // 发送者的姓名
            img: socket.img,
            msg: obj.msg,
            time: new Date().toLocaleString(),
            type: 'msg',
            msgType: 'text'
        });
    })
    socket.on("file", obj=>{
        // 广播给所有的用户
        io.emit('msg', {
            username: socket.username, // 发送者的姓名
            img: socket.img,
            msg: obj.url,
            time: new Date().toLocaleString(),
            type: 'msg',
            msgType: 'image'
        });
    })

    socket.on("disconnect", function () {
        // 用户断开了连接
        userList.splice(userList.indexOf(socket.username), 1)
        userInfo = userInfo.filter(val => {
            return val.username !== socket.username
        })
        io.emit('userList', userInfo)
        // 告诉其他用户，谁离开了群聊
        io.emit("msg", {
            username: socket.username,
            time: new Date().toLocaleString(),
            type: 'leave'
        })
        // io.emit("user disconnected")
    })

    socket.on("reconnect", function () {
        // 用户断开了连接
        console.log('重新连接')
        // io.emit('userList', userInfo)
    })
});
http.listen(3000, function(){
    console.log('服务启动成功了');
});