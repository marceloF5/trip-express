module.exports = function (app) {
	
	var authenticator = require('./../middlewares/authenticator');

	var controller = app.controllers.vehicle;

	app.route('/vehicles')
		.get(authenticator, controller.selectAllVehicles)
		.post(authenticator, controller.saveVehicle);

	app.route('/vehicles/:vehicle')
		.get(authenticator, controller.selectVehicle);		
		
};