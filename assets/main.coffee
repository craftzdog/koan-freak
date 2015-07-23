require ['app.styl'], ->
$ = require 'jquery'
app = require 'app'
$ ->
  angular.bootstrap document, [app.name]
