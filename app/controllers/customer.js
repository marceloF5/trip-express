module.exports = function (app) {

	var sanitize = require('mongo-sanitize')
      , Customer = app.models.customer
	  , controller = {};

 	controller.selectAllCustomers = function (req, res) {		
	 	Customer.find().exec()
			.then(
				function (customer) {	
					if(customer) {
						console.info('INFO -- MESSAGE: Customers list returned with success');						
						res.json(customer);																											
					} else {						
						console.info('INFO -- MESSAGE: Customers does not exit');			 			
		 				res.json({error: true, message: 'Clientes não existem.'});
					}	
				},
				function (error) {					
					res.status(500).json({message: 'Erro ao consultar lista de clientes, por favor contate o administrador'});				
					console.error('ERROR -- 500, MESSAGE: Error to getting customers list', {error: error});										
				}
			);
		
	};

	controller.selectCustomerByUser = function (req, res) {	

		var _id = sanitize(req.params.customerId);				
		Customer.find({_id: _id}).exec() 
			.then(function (customer) {					
					if(customer) {						
						res.json(customer);
						console.info('INFO -- MESSAGE: Customer returned with success');																				
					} else {					
						res.json(customer, {message: 'Cliente não encontrato'});
					}
				},
				function (error) {					
					res.status(501).json({message: 'Erro ao consultar cliente, por favor contate o administrador'});									
					console.error('ERROR -- 501, MESSAGE: Error to getting customer');										
				});
	};

	controller.selectCustomerSchedule = function (req, res) {		
		var _id = sanitize(req.params.customer);					
		Customer.find({_id: _id}).exec()
			.then(function (customer) {					
					if(customer) {						
						res.json(customer);
						console.info('INFO -- MESSAGE: Customer returned with success');																				
					} else {					
						res.json(customer, {message: 'Cliente não encontrato'});
					}
				},
				function (error) {					
					res.status(501).json({message: 'Erro ao consultar cliente, por favor contate o administrador'});									
					console.error('ERROR -- 501, MESSAGE: Error to getting customer');										
				});
	};	

	controller.saveCustomer = function (req, res) {
		
		var _id = req.body._id;					
		
		if(_id) {			
			Customer.findByIdAndUpdate(_id, 
					{$set:{	fantasyName: req.body.fantasyName, 
			   			   	companyName: req.body.companyName,
			   				idType: req.body.idType,
			   				idNumberCNPJ: req.body.idNumberCNPJ,
			   				idNumberCPF: req.body.idNumberCPF,
			   				email: req.body.email,
			   				zipCode: req.body.zipCode,
			   				address: req.body.address,
		   					state: req.body.state,
		   					contact: req.body.contact,
		   					phone: req.body.phone,
		   					description: req.body.description,
				   			inactive: req.body.inactive}},
					req.body)
				.exec()
				.then(function (customer) {				
					res.json(customer);
					console.info('INFO -- MESSAGE: Customer updated with success');																										
				},	
				function (error){											
					console.error('ERROR -- MESSAGE: Error to update customer', {error: error});										
					if (error.code) {
						if(error.code == 11001) {
							res.status(500).json({message: 'Cliente já está registrado na base'});
						}
					} else {
						res.status(501).json({message: 'Erro ao criar o cliente, por favor contate o administrador'});														
					}
				});				   		

		} else {					
			Customer.create(req.body)			
				.then(function (customer) {					
					res.json(customer);
					console.info('INFO -- MESSAGE: Customer created with success');
				},
				function (error){
					console.error('ERROR -- MESSAGE: Error to create customer');
					console.error(error);
					if (error.code) {						
						if(error.code == 11000) {
							res.status(500).json({message: 'Cliente já está registrado na base'});
						}
					} else {
						res.status(501).json({message: 'Erro ao criar o cliente, por favor contate o administrador'});														
					}
				});
	    }
	};
		
	return controller;

};