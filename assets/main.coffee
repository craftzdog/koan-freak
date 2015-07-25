require ['app.styl'], ->
app = require 'app'
$ ->
  angular.bootstrap document, [app.name]
