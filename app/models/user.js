var mongoose = require('mongoose');

module.exports = function () {

	var schema = mongoose.Schema({

		login: {
			type: String,
			required: true,
			index: {unique: true}
		},
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			index: {unique: true}
		},
		password: {
			type: String,
			required: true			
		},
		passwordConfirm: {
			type: String,
			required: true			
		},
		role: {
			type: String,
			required: true
		},
		client: {			
			type: String		
		},
		address: {
			type: String 
		},
		inactive: {
			type: Boolean
		}
	});

	return mongoose.model('User', schema);

};