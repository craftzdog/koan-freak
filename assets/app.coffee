
# Define app module
main = angular.module ___c.appId, [
  'ui.router',
  'ui.bootstrap',
  'ngRoute',
  'ngResource',
  'ngCookies'
]

main.config ($stateProvider, $urlRouterProvider, $locationProvider) ->
  $locationProvider.html5Mode(true)

  $stateProvider
    .state("landing", {
      url: '/',
      data: {
      },
      views: {
        '': {
          template: require("./home/landing.jade")
        },
      },
    })

main.run ($rootScope, $state, $stateParams, $log, $location) ->
  # It's very handy to add references to $state and $stateParams to the $rootScope
  # so that you can access them from any scope within your applications.For example,
  # <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
  # to active whenever 'contacts.list' or one of its decendents is active.
  $rootScope.$state = $state
  $rootScope.$stateParams = $stateParams

  $rootScope.$on '$stateChangeStart', (event, toState, toParams) ->
    $rootScope.inAppMode = $location.$$search.app

module.exports = main
