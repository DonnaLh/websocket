/*
*  动态网页模板， 需先安装模板引擎hbs
* */

var express = require('express');
var app1 = express();
const bodyParser = require('body-parser')

var hbs = require('hbs');


app1.set('view engine', 'html');
app1.engine('html', hbs.__express);
app1.use(bodyParser.json());
app1.use(bodyParser.json({ type: 'application/vnd.api+json' }))


/*
*  第一个参数是访问路径， 第二个参数是一个回调函数
* */
require('./routes')(app1)

app1.listen(8000);