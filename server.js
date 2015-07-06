var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(_clarence)).listen(8080);