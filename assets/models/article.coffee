module.exports = (app)->
  app.factory "Article", ($resource)->
    return $resource "/api/articles/:id", { id: "@id" }, {
      'index':   { method: 'GET', isArray: true, params: {  } }
      'show':    { method: 'GET', isArray: false }
    }
