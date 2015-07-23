var serve = require('koa-static');

module.exports = function(app) {

  app.use(serve(__dirname + '/../public'));

  app.use(function*(next) {
    this.body = yield this.render('index', this.getViewModel());
  });

};
