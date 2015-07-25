module.exports = ($scope, $routeParams, $state, $stateParams, $location, $log, Article)->
  $scope.articles = Article.index()
