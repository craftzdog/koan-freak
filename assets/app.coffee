app = angular.module ___c.appId, [
  'ui.router',
  'ui.bootstrap',
  'ngRoute',
  'ngResource',
  'ngCookies',
  'angular-loading-bar'
]

app.config ($stateProvider, $urlRouterProvider, $locationProvider) ->
  $locationProvider.html5Mode(true)

  $stateProvider
    .state "landing",
      url: '/'
      views:
        '':
          template: require("./home/landing.jade")
          controller: require("./home/landing")

app.config (cfpLoadingBarProvider)->
  cfpLoadingBarProvider.includeSpinner = false;

require('./modules/session')(app)
require('./models/article')(app)

app.run ($rootScope, $state, $stateParams, $log, $location, $http, Session) ->
  # It's very handy to add references to $state and $stateParams to the $rootScope
  # so that you can access them from any scope within your applications.For example,
  # <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
  # to active whenever 'contacts.list' or one of its decendents is active.
  $rootScope.$state = $state
  $rootScope.$stateParams = $stateParams

  $rootScope.$on '$stateChangeStart', (event, toState, toParams) ->
    $rootScope.inAppMode = $location.$$search.app

  # Set CSRF token to default request header
  $http.defaults.headers.common['x-csrf-token']= Session.csrf

module.exports = app
