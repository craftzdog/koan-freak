var app = require('./app/index')();

app.listen(app.config.port);
app.logger.debug('Listening on port ' + app.config.port);
