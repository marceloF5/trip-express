var mongoose = require('mongoose');

module.exports = function () {

	var schema = mongoose.Schema({

		driver: {
			type: String,
			required: true
		},
		
		driverName: {
			type: String,
			required: true
		},
		
		vehicle: {
			type: String,
			required: true			
		},
		
		vehicleName: {
			type: String,
			required: true			
		},			

		latitude: {
			type: String,
			required: true,	
		},

		longitude: {
			type: String,
			required: true,			
		}
	});

	return mongoose.model('Moving', schema);

};