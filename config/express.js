var express = require('express'),
	load = require('express-load'),
	bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    jwt = require('jwt-simple'),
    helmet = require('helmet');

module.exports = function() {

	var app = express();

	//var addr = process.env.OPENSHIFT_NODEJS_IP || process.env.ADDR || 'localhost';
	//var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;

	// PORT CONFIGURATION
	app.set('port', 3000);
	//app.set('addr', addr);
	//app.set('port', port);

	// MIDDLEWARE
	app.use(express.static('./public'));	
	app.set('views', './app/views');
	app.set('view engine', 'ejs');
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());
	app.use(helmet());

	app.disable('x-powered-by');	
	//app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());

	load('models', {cwd: 'app'})
	 	.then('controllers')
	 	.then('routes')
	 	.into(app);

	var env = process.env.NODE_ENV || 'development';

	app.get('*', function(req, res) {
		res.status(404).render('404');
	});	 

	//app.listen(port, addr);
	
	return app;
};