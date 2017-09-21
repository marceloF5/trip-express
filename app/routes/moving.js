module.exports = function (app) {		

	var authenticator = require('./../middlewares/authenticator');

	var controller = app.controllers.moving;

	app.route('/moving')
		.get(controller.selectAllMoving)
		.post(controller.saveMoving);			

	app.route('/moving/:_id')
		.delete(authenticator, controller.removeMoving);

};