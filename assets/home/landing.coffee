module.exports = ($scope, $routeParams, $state, $stateParams, $location, $log, Article, cfpLoadingBar)->
  $scope.articles = Article.index()
