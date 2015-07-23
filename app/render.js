var _ = require('lodash');
var views = require('co-views');

/**
 * Load SSPE Core API wrapper module
 */
module.exports = function (app, opts) {

  define(app);
  return app;

  function define(ctx) {
    var context = ctx.context || ctx;

    var render = views(__dirname + '/../views', {
      "default": 'jade'
    });

    context.render = render;

  }

};
