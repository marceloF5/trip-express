module.exports = function (app) {		

	var authenticator = require('./../middlewares/authenticator');

	var controller = app.controllers.login;

	app.route('/login')		
		.post(controller.authenticate);

	app.route('/login/:userId')
		.get(authenticator, controller.logged);

};