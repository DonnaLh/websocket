const ws = require('nodejs-websocket')

/*
* 1、告诉所有用户，有人加入了聊天室
* 2、当我们接收到某个用户的信息的时候，告诉所有用户，发送的消息内容是什么
* 3、只要有人离开，告诉所有用户有人离开了
* */

/*
* connect.send() ，只能给当前用户发送消息
* server.connections 所有连接用户的数组，作用是广播一条信息
* */
const createServer = () => {
    // 每次只要有用户连接，函数就会被执行，会给当前用户创建一个connect对象
    let server = ws.createServer(connection => {

        // 每当监听到用户传递过来的数据，这个text事件就会触发
        connection.on('text', function(result) {
            // 给用户一个响应的数据,可以在此处对用户发送的数据做一些处理
            console.log('发送消息', result)
            // connection.send(result)
            broadcast(server, {
                msg: result,
                time: new Date().toLocaleTimeString(),
                type: 1
            })
        })
        connection.on('connect', function(code) {
            console.log('开启连接', code)
        })
        // 只要websocket连接端口，close事件就会触发
        connection.on('close', function(code) {
            console.log('关闭连接', code)
        })
        // 处理用户的错误信息，只要断开就会报一个异常
        connection.on('error', function(code) {
            console.log('异常关闭', code)
        })
    })
    server.listen(3000, ()=>{
        console.log("websocket服务启动成功了")
    })


    return server
}

// 广播，给所有的用户发送消息
function broadcast(server, data) {
    server.connections.forEach(function (conn) {
        conn.send(JSON.stringify(data))
    })
}

module.exports = createServer()