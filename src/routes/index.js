var blogEngine = require('../dynamic/blog');
module.exports = function (app) {
    app.get('/', function(req, res) {
        res.render('index',{title:"最近文章", entries:blogEngine.getBlogEntries()});
    });

    app.get('/about', function(req, res) {
        res.render('about', {title:"自我介绍"});
    });

    app.get('/article/:id', function(req, res) {
        var entry = blogEngine.getBlogEntry(req.params.id);
        res.render('article',{title:entry.title, blog:entry});
    });
};