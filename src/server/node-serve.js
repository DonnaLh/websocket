const app = require("express")()
const http = require("http").Server(app)
const io = require('socket.io')(http)

app.get("/", function (req, res) {
    res.send('<h1>Welcome Realtime Server</h1>')
})

io.on("connection", function (socket) {
    socket.on("disconnect", function () {
        io.emit("dis", {
            user_id: socket.name
        })
    })
    socket.on("join", function (data) {
        let userId = data.user_id;
        io.emit("joinok", {
            msg: 'join ok',
            userId
        })
    })

    socket.on("xiaoxi", function (data) {
        io.emit("message", data)
    })
})



http.listen(1000, function () {
    console.log('listening on*:1000')
})