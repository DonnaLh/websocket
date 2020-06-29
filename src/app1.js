/*
*  动态网页模板， 需先安装模板引擎hbs
* */

var express = require('express');
var app1 = express();
const bodyParser = require('body-parser')

var hbs = require('hbs');

// 加载数据模块
var blogEngine = require('./dynamic/blog');

app1.set('view engine', 'html');
app1.engine('html', hbs.__express);
app1.use(bodyParser.json());
app1.use(bodyParser.json({ type: 'application/vnd.api+json' }))


/*
*  第一个参数是访问路径， 第二个参数是一个回调函数
* */

app1.get('/', function(req, res) {
    res.render('index',{title:"最近文章", entries:blogEngine.getBlogEntries()});
});

app1.get('/about', function(req, res) {
    res.render('about', {title:"自我介绍"});
});

app1.get('/article/:id', function(req, res) {
    var entry = blogEngine.getBlogEntry(req.params.id);
    res.render('article',{title:entry.title, blog:entry});
});

app1.listen(8000);