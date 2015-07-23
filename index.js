var app = require('./app/index')();

app.listen(4000);
app.logger.debug('Listening on port 4000');
