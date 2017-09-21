var mongoose = require('mongoose');

module.exports = function (uri) {

	mongoose.connect(uri);

	mongoose.connection.on('connected', function () {
		console.log('Mongoose! Connected in ' + uri);
	});
	
	mongoose.connection.on('disconnected', function () {	
		console.log('Mongoose! Disconnected in ' + uri);
	});

	mongoose.connection.on('error', function (error) {	
		console.log('Mongoose! Error in the Connection: ' + error);
	});

	process.on('SIGNIT', function () {
		mongoose.connection.close(function () {
			console.log('Mongoose! Disconnected by Application TripExpress');
			process.exit(0);
		});
	});

}