var assert = require('assert');
var _ = require('lodash');
var https = require('https');
var fs = require('fs');
var consts = require('./consts');

module.exports = function (app, opts) {

  define(app);
  return app;

  function define(ctx) {
    var context = ctx.context || ctx;

    /**
     * Validate CSRF token in the request body
     */
    context.checkCsrfToken = function() {
      try {
        this.assertCSRF(this.request.body);
        return true;
      }
      catch (err) {
        context.logger.err("Invalid CSRF token: " + err);
        return false;
      }
    };

    /**
     * Get model for rendering view
     */
    context.getViewModel = function (opts) {
      return _.defaults(opts||{}, {
        csrf: this.csrf,
        config: {
          env: process.env.NODE_ENV,
          appId: consts.appId
        },
        webpack: this.config.webpack,
        title: 'Web service',
        meta: [
          { name: 'description', content: 'Web service' },
        ],
        params: {
          redirect_to: false,
          state: false
        }
      });
    };

  }

};
