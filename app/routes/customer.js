module.exports = function (app) {
	
	var authenticator = require('./../middlewares/authenticator');

	var controller = app.controllers.customer;

	app.route('/customers')
		.get(authenticator, controller.selectAllCustomers)
		.post(authenticator, controller.saveCustomer);

	app.route('/customers/:customerId')
		.get(authenticator, controller.selectCustomerByUser);

	app.route('/customersOfSchedule/:customer')
		.get(authenticator, controller.selectCustomerSchedule);			
		
};
