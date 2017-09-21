var mongoose = require('mongoose');

module.exports = function () {

	var schema = mongoose.Schema({

		fantasyName: {
			type: String,
			required: true,			
		},
		companyName: {
			type: String,
			required: true			
		},
		idType: {
			type: String,
			required: true			
		},
		idNumberCNPJ: {
			type: String,
			required: true,
			index: {unique: true}
		},
		idNumberCPF: {
			type: String,
			required: true,
			index: {unique: true}
		},
		zipCode: {
			type: String,
			required: true
		},
		address: {
			type: String,
			required: true
		},
		city: {
			type: String,
			required: true
		},
		state: {
			type: String,
			required: true
		},
		contact: {
			type: String,
			required: true
		},
		phone: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		description: {
			type: String			
		},
		inactive: {
			type: Boolean
		}
	});

	return mongoose.model('Customer', schema);

};