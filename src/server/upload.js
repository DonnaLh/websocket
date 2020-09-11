const app = require('express')();
const server = require('http').Server(app);

server.listen(3009);

var express = require('express');
var router = express.Router();
var multer = require('multer');
const path = require("path")
const fs = require("fs")

var uploading = multer({
    dest: __dirname + '../../public/uploads/',
    // 设定限制，每次最多上传1个文件，文件大小不超过1MB
    limits: {fileSize: 1000000, files:1},
})

router.post('/upload', uploading, function(req, res) {
    // console.log(req, res)
    let jsPath = path.resolve(__dirname, __dirname + '/upload.html')
    let cont = fs.readFileSync(jsPath)
    res.end(cont)
})

// module.exports = router