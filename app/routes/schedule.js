module.exports = function (app) {

    var authenticator = require('./../middlewares/authenticator');
	
	var controller = app.controllers.schedule;

	app.route('/schedules')
		.get(authenticator, controller.selectAllSchedules)
		.post(authenticator, controller.saveSchedule);		

	app.route('/schedulesByUser/:user')		
		.get(authenticator, controller.selectScheduleByUser);		
	
	app.route('/schedulesByDriver/:user')		
		.get(authenticator, controller.selectScheduleByDriver);				

	app.route('/schedulesByCustomer/:customer')
		.get(authenticator, controller.selectScheduleByCustomer);			

	app.route('/schedules/:scheduleId')
		.delete(authenticator, controller.removeSchedule);
		
};
