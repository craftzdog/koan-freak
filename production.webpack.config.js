var webpack = require("webpack");
var path = require("path");
var bowerPath = path.join( __dirname, "bower_components" );
var assetsPath = path.join( __dirname, "assets" );
var jsPath = path.join( __dirname, "assets/js" );
var cssPath = path.join( __dirname, "assets/css" );
var imgPath = path.join( __dirname, "assets/css" );
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

var config = require('./webpack.config.js');
config.output = {
  filename: 'app.[hash].bundle.js',
  chunkFilename: '[chunkhash].bundle.js',
  path: 'public',
  publicPath: "/"
};

// Define a new plugin that tells webpack to look at the main property in bower.json files when resolving dependencies.
// For marionette, we need it to load the CJS version, which we specify with as ["main", "1"] in the args below.
config.plugins = [
  new ngAnnotatePlugin({
    add: true,
  }),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery",
    _: "underscore"
  }),
  new webpack.ResolverPlugin([
    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin( "bower.json", ["main", ["main", "1"]] )
  ], ["normal", "loader"]),
  new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"0-vendor", /* filename= */"vendor.[hash].bundle.js", Infinity),
  new ExtractTextPlugin("css/[name].[hash].css", {
    disable: false,
    allChunks: true
  }),
  new webpack.optimize.UglifyJsPlugin({ minimize: true }),
  function() {
    this.plugin("done", function(stats) {
      require("fs").writeFileSync(
        path.join(__dirname, "/public/", "stats.json"),
        JSON.stringify(stats.toJson()));
    });
  }
];

module.exports = config;
