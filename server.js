var http = require('http'),
	express = require('express'),
	app = require('./config/express')(app); 

require('./config/database.js')('mongodb://localhost/tripExpress');

http.createServer(app).listen(app.get('port'), function () {
	console.log('Express Server! Executing in port ' + app.get('port'));
	console.log('TripExpress is executing!');
});