module.exports = (app)->
  app.service 'Session', ($rootScope, $cookies, $log)->
    session = $rootScope.session = {}

    session.csrf = $('meta[name="c"]').attr('content')
  
    $log.debug 'CSRF token =', session.csrf

    return session

