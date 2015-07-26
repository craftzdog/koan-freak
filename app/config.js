var consts = require('./consts');
var _ = require('lodash');

module.exports = function(app, config) {
  
  define(app);
  return app;

  function define(ctx) {
    var context = ctx.context || ctx;

    if(config===undefined) {
      config = require(consts.config_fn)[process.env.NODE_ENV];
    }

    // load webpack info
    var stats = require('../public/stats.json');

    var jsFiles = _.flatten(Object.keys(stats.assetsByChunkName).map(function(name) {
      return filterExtension(stats.assetsByChunkName[name], 'js');
    }));
    var cssFiles = _.flatten(Object.keys(stats.assetsByChunkName).map(function(name) {
      return filterExtension(stats.assetsByChunkName[name], 'css');
    }));

    config.webpack = {
      js: jsFiles,
      css: cssFiles,
      publicPath: stats.publicPath
    };
    context.config = ctx.config = config;

    console.log(config.webpack);
  }

  function filterExtension(arr, ext) {
    return arr.reduce(function(res, file) {
      if(file.match(new RegExp(ext + "$"))) {
        res.push(file);
      }
      return res;
    }, []);
  }

};

