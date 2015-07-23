var koa = require('koa');
var csrf = require('koa-csrf');
var _ = require('koa-route');
var common = require('koa-common');
var session = common.session;

module.exports = function(config) {

  var app = koa();

  require('./config')(app, config);
  require('./logger')(app, {
    basePath: __dirname
  });
  require('./utils')(app);
  require('./error')(app);
  require('./render')(app);

  switch(process.env.NODE_ENV) {
    case 'production':
      app.logger.info("################################");
      app.logger.info("### This is PRODUCTION MODE. ###");
      app.logger.info("################################");
      break;
    case 'development':
      app.logger.warn("#################################");
      app.logger.warn("### This is DEVELOPMENT MODE. ###");
      app.logger.warn("#################################");
      break;
    default:
      throw new Error("Unknown environment: " + process.env.NODE_ENV);
  }

  /**
   * Logging
   */

  var morgan = require('morgan')('combined', {
    stream: app.logger.stream
  });

  app.use(function*(next) {
    morgan(this.req, this.res, function(err) {
      if (err) {
        return this.logger.err(err);
      }
    });
    yield next;
  });

  /**
   * Parser
   */
  app.use(function*(next) {
    if(this.method==='POST' && !this.request.header['content-type'].match(/^multipart/)) {
      this.request.body = yield parse(this);
    }
    yield next;
  });

  /**
   * Error handler
   */
  app.use(app.error.handler);

  /**
   * CSRF tokens
   */
  csrf(app);
  app.use(csrf.middleware);

  /**
   * Routes
   */
  require('./routes')(app);

  return app;
};
