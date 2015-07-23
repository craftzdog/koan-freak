var _ = require('lodash');
var util = require('util');

/**
 * Load SSPE Core API wrapper module
 */
module.exports = function (app, opts) {

  define(app);
  return app;

  function define(ctx) {
    var context = ctx.context || ctx;

    ctx.error = context.error = {
      handler: handleError,
      notfound: renderNotFound,
      invalidRequest: renderInvalidRequest
    };
  }

  function *handleError(next) {
    try {
      yield next;
    }
    catch (err) {
      var msg = err.stack;
      if (err.errors) {
        msg += "\n" + util.inspect(err.errors, { showHidden: true, depth: null });
      }
      this.logger.error(msg);
      this.status = err.status || 500;
      this.body = "<h1>" + err + "</h1>";
      this.app.emit('error', err, this);
    }
  }

  /**
   * Render page for 404 not found
   */
  function renderNotFound() {
    return function* () {
      this.status = 404;
      this.body = yield function(cb) {
        cb(null, "Not found");
      };
    };
  }
  
  /**
   * Render page for 403 forbidden
   */
  function renderInvalidRequest(response) {
    return function* () {
      this.status = 403;
      this.body = yield function(cb) {
        if(response) {
          cb(null, response);
        }
        else {
          cb(null, "Invalid request");
        }
      };
    };
  }
  
};


