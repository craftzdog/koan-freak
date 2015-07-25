var webpack = require("webpack");
var path = require("path");
var bowerPath = path.join( __dirname, "bower_components" );
var assetsPath = path.join( __dirname, "assets" );
var jsPath = path.join( __dirname, "assets/js" );
var cssPath = path.join( __dirname, "assets/css" );
var imgPath = path.join( __dirname, "assets/css" );
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    '0-vendor': [
      'jquery',
      'angular',
      'angular-route',
      'angular-cookies',
      'angular-resource',
      'angular-loading-bar/build/loading-bar.js',
      'angular-loading-bar/build/loading-bar.css',
      'bootstrap/less/bootstrap.less',
      'angular-bootstrap/ui-bootstrap-tpls.js',
      'angular-ui-router',
      'underscore',
      //'font-awesome/css/font-awesome.css',
      'imports?jQuery=jquery!bootstrap/dist/js/bootstrap.js'
    ],
    'app': './assets/main.coffee'
  },
  output: {
    filename: 'bundle.js',
    path: 'public/js',
    publicPath: "/js/"
  },
  resolve: {
    extensions: ['', '.js', '.coffee', '.less', '.css', '.scss', '.sass', '.jpg', '.png', '.gif'],
    // Tell webpack to look in node_modules, then bower_components when resolving dependencies
    // If your bower component has a package.json file, this is all you need.
    modulesDirectories: ["node_modules", bowerPath, assetsPath, jsPath, cssPath],
    alias: {
    }
  },
  // Define a new plugin that tells webpack to look at the main property in bower.json files when resolving dependencies.
  // For marionette, we need it to load the CJS version, which we specify with as ["main", "1"] in the args below.
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        _: "underscore"
    }),
    new webpack.ResolverPlugin([
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin( "bower.json", ["main", ["main", "1"]] )
    ], ["normal", "loader"]),
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"0-vendor", /* filename= */"vendor.bundle.js", Infinity),
    //new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("../css/[name].css", {
      disable: false,
      allChunks: true
    }),
    function() {
      this.plugin("done", function(stats) {
        require("fs").writeFileSync(
          path.join(__dirname, "/public/js/", "stats.json"),
          JSON.stringify(stats.toJson()));
      });
    },
    function() {
      this.plugin("done", function(stats) {
        if(stats.hasErrors()) process.stdout.write('\x07');
      });
    }
  ],
  devServer: {
    contentBase: ".",
  },
  module: {
    loaders: [
      //{ test: /\.css$/, loader: 'style!css' },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")
      },
      //{ test: /\.woff(\?.*)?$/, loader: 'url-loader?mimetype=application/font-woff' },
      //{ test: /\.woff2(\?.*)?$/, loader: 'url-loader?mimetype=application/font-woff2' },
      //{ test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?mimetype=image/svg+xml' },
      //{ test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?mimetype=application/font-woff' },
      //{ test: /\.ttf(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.woff2(\?.*)?$/, loader: 'file?name=../fonts/[name]-[hash].[ext]' },
      { test: /\.woff(\?.*)?$/, loader: 'file?name=../fonts/[name]-[hash].[ext]' },
      { test: /icon.*\.svg(\?.*)?$/i, loader: 'file?name=../fonts/[name]-[hash].[ext]' },
      { test: /\.eot(\?.*)?$/, loader: 'file?name=../fonts/[name]-[hash].[ext]' },
      { test: /\.ttf(\?.*)?$/, loader: 'file?name=../fonts/[name]-[hash].[ext]' },
      { test: /\.coffee$/, loader: "coffee" },
      { test: /\.json$/, loader: 'json' },
      { test: /\.jade$/, loader: "jade" },
      { test: /\.html$/, loader: 'html' },
      { test: /\.yml$/, loader: 'json!yaml' },
      { test: /img\/.*\.svg(\?.*)?$/i, loaders: [
          'file?name=../img/[name]-[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      //{ test: /\.less/, loader: 'style-loader!css-loader!less-loader' },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!less-loader')
      },
      //{ test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!stylus-loader')
      },
      //{ test: /\.(jpg|png)$/, loader: 'file?name=public/img/[name]-[hash].[ext]' },
      //{ test: /\.(jpg|png|gif)$/, loader: 'file' },
    ]
  }
};
