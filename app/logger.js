var winston = require('winston');
var path = require('path');
var util = require('util');
var _ = require('lodash');
winston.emitErrs = true;

module.exports = function(app, opts) {
  opts = _.defaults(opts || {}, {
    stack: true,
    stackIndex: 1,
    basePath: __dirname
  });

  var logger = new winston.Logger({
    transports: [
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        timestamp: true,
        prettyPrint: true,
      })
    ],
    exitOnError: false
  });

  var _log = logger.log;
  logger.log = function() {
    var self     = this;
    var args     = Array.prototype.slice.call(arguments);
    var message  = args[1];
    var stack    = {};

    if(message instanceof Error) {
      message = message.stack;
    }

    if (opts.stack) {
      // get call stack, and analyze it
      // get all file,method and line number
      var stacklist = (new Error()).stack.split('\n').slice(2);
      // Stack trace format :
      // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
      // DON'T Remove the regex expresses to outside of method, there is a BUG in node.js!!!
      var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
      var stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

      var s = stacklist[opts.stackIndex] || stacklist[0],
        sp = stackReg.exec(s) || stackReg2.exec(s);
      if (sp && sp.length === 5) {
        stack.method = sp[1];
        stack.path = sp[2];
        stack.line = sp[3];
        stack.pos = sp[4];
        stack.file = path.basename(stack.path);
        stack.stack = stacklist.join('\n');
      }
    }

    message = path.relative(opts.basePath, stack.path) + ":" + stack.line + ": " + message;
    args[1] = message;

    _log.apply(logger, args);
  };

  var exports = logger;
  exports.stream = {
      write: function(message, encoding){
          logger.info(message);
      }
  };

  app.context.logger = app.logger = exports;
  return exports;
};
