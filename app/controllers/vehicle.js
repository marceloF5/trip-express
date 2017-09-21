module.exports = function (app) {

	var sanitize = require('mongo-sanitize')
      , Vehicle = app.models.vehicle
	  , controller = {};

 	controller.selectAllVehicles = function (req, res) {		
	 	Vehicle.find().exec()
			.then(
				function (vehicle) {	
					if(vehicle) {
						console.info('INFO -- MESSAGE: Vehicles list returned with success');						
						res.json(vehicle);																											
					} else {						
						console.info('INFO -- MESSAGE: Vehicles does not exit');			 			
		 				res.json({error: true, message: 'Veículos não existem.'});
					}	
				},
				function (error) {					
					res.status(500).json({message: 'Erro ao consultar lista de veículos, por favor contate o administrador'});				
					console.error('ERROR -- 500, MESSAGE: Error to getting Vehicles list', {error: error});										
				}
			);
		
	};

	controller.selectVehicle = function (req, res) {		
		var _id = sanitize(req.params.vehicle);				
		Vehicle.findById(_id).exec() 
			.then(function (vehicle) {					
					if(vehicle) {						
						res.json(vehicle);
						console.info('INFO -- MESSAGE: Vehicles returned with success');																				
					} else {					
						res.json(vehicle, {message: 'Veículos não encontrato'});
					}
				},
				function (error) {					
					res.status(501).json({message: 'Erro ao consultar veículo, por favor contate o administrador'});									
					console.error('ERROR -- 501, MESSAGE: Error to getting vehicle');										
				});
	};
	
	controller.saveVehicle = function (req, res) {
		
		var _id = req.body._id;			
		
		if(_id) {						
			Vehicle.findByIdAndUpdate(_id, 				    
					/*{$set:{ fleet: req.body.fleet, 
			   			   	frame: req.body.frame,
			   				license: req.body.license,
			   				brand: req.body.brand,
			   				model: req.body.model,
			   				fuel: req.body.fuel,
			   				yearMade: req.body.yearMade,
			   				yearMode: req.body.yearMode,
		   					doors: req.body.doors,
		   					passengers: req.body.passengers,
		   					fipeCode: req.body.fipeCode}},*/
					req.body)
				.exec()
				.then(function (vehicle) {				
					res.json(vehicle);
					console.info('INFO -- MESSAGE: Vehicle updated with success');																										
				},	
				function (error) {											
					console.error('ERROR -- MESSAGE: Error to update vehicle', {error: error});										
					if (error.code) {
						if(error.code == 11001) {
							res.status(500).json({message: 'Veículo já está registrado na base'});
						}
					} else {
						res.status(501).json({message: 'Erro ao criar o veículo, por favor contate o administrador'});														
					}
				});		
						   		
		} else {					
			Vehicle.create(req.body)			
				.then(function (vehicle) {					
					res.json(vehicle);
					console.info('INFO -- MESSAGE: Vehicle created with success');
				},
				function (error){
					console.error('ERROR -- MESSAGE: Error to create vehicle');
					console.error(error);
					if (error.code) {						
						if(error.code == 11000) {
							res.status(500).json({message: 'Veículo já está registrado na base'});
						}
					} else {
						res.status(501).json({message: 'Erro ao criar o veículo, por favor contate o administrador'});														
					}
				});
	    }
	};
		
	return controller;

};