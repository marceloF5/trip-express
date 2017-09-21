module.exports = function (app) {

    var authenticator = require('./../middlewares/authenticator');
	
	var controller = app.controllers.user;

	app.route('/users')
		.get(authenticator, controller.selectAllUsers)
		.post(authenticator, controller.saveUser);

	app.route('/users/:userId')
		.get(authenticator, controller.selectUser);	

	app.route('/usersOfSchedule/:user')
		.get(authenticator, controller.selectUserSchedule);	

	app.route('/usersOfCustomer/:customer')
		.get(authenticator, controller.selectAllUserByCustomer);	

	app.route('/driverUsers')
		.get(authenticator, controller.selectDriverUser);
		
};
