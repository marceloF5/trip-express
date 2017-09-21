var mongoose = require('mongoose');

module.exports = function () {

	var schema = mongoose.Schema({

		fleet: {
			type: String,
			required: true,
			index: {unique: true}			
		},
		frame: {
			type: String,
			required: true,
			index: {unique: true}
		},
		license: {
			type: String,
			required: true,
			index: {unique: true}
		},
		brand: {
			type: String,
			required: true			
		},
		model: {
			type: String,
			required: true			
		},
		fuel: {
			type: String,
			required: true
		},
		yearMade: {			
			type: String,
			required: true
		},
		yearMode: {
			type: String,
			required: true
		},
		doors: {
			type: String,
			required: true
		},
		passengers: {
			type: String,
			required: true
		},
		fipeCode: {
			type: String,
			required: true
		}

	});

	return mongoose.model('Vehicles', schema);

};