module.exports = ($scope, $routeParams, $state, $stateParams, $location, $log, Article, cfpLoadingBar)->
  "ngInject"

  $scope.articles = Article.index()
