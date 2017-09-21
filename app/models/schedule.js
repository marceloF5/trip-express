var mongoose = require('mongoose');

module.exports = function () {

	var schema = mongoose.Schema({

		customer: {
			type: String,			
			type: mongoose.Schema.ObjectId,
			ref: 'Customer'
		},
		user: {
			type: String,				
			type: mongoose.Schema.ObjectId,
			ref: 'User'
		},
		driver: {
			type: String,				
			type: mongoose.Schema.ObjectId,
			ref: 'User'
		},
		driverName: {
			type: String			
		},
		vehicle: {
			type: String,				
			type: mongoose.Schema.ObjectId,
			ref: 'Vehicle'
		},
		vehicleModel: {
			type: String			
		},
		title: {
			type: String,				
			required: true
		},
		dateStart: {
			type: String,
			required: true
		},
		timeStart: {
			type: String,
			required: true			
		},
		timeEnd: {
			type: String,
			required: true
		},
		addressType: {
			type: String,
			required: true
		},
		localOrigin: {
			type: String,			
			required: true
		},
		localRef:{
			type: String
		},
		localDestination: {
			type: String,			
			required: true
		},
		color: {
			type: String,
			required: true
		},
		status: {
			type: String,
			required: true
		}

	});

	return mongoose.model('Schedule', schema);

};