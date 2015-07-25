var serve = require('koa-static');
var router = require('koa-route');

module.exports = function(app) {

  app.use(serve(__dirname + '/../public'));
  app.use(router.get('/api/articles/', require('./api/articles/')));

  app.use(function*(next) {
    this.body = yield this.render('index', this.getViewModel());
  });

};
