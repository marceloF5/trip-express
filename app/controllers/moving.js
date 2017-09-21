module.exports = function (app) {

	var sanitize = require('mongo-sanitize')
      , Moving = app.models.moving
      , User = app.models.user
      , Vehicle = app.models.vehicle
      , controller = {}; 

  	controller.selectAllMoving = function (req, res) {		
	 	Moving.find().exec()
			.then(function (moving) {					
				res.json(moving);										
				console.info('INFO -- MESSAGE: Moving list returned with success');														
			},	
			function (error) {					
				res.status(500).json({message: 'Erro ao consultar lista de horários, por favor contate o administrador'});				
				console.error('ERROR -- 500, MESSAGE: Error to getting moving list', {error: error});										
			});		
	};

	controller.saveMoving = function (req, res) {

		var _id = req.body._id;		
/*
		function selectDriver () {			
			User.findById(req.body.driver)
				.exec()
				.then(function (user) {											
					if (user) {	
						req.body.driverName = user.name;																				
						console.log(req.body.driverName)													
						console.info('INFO -- MESSAGE: User selected with success');						
					} else {
						console.info('INFO -- MESSAGE: User do not exit');			 			
		 				res.json({error: true, message: 'Usuário não existe. Por favor, contate o administrador'});											
					}
				},
				function (error) {
					console.error('ERROR -- CODE: 503 MESSAGE: The General Error');				 			
	 				res.status(503).json({message: 'Erro Geral, por favor contate o administrador'});											
				});	
		}

		function selectVehicle () {			
			Vehicle.findById(req.body.vehicle)
			    .exec() 
				.then(function (vehicle) {											
					if(vehicle) {																
						req.body.vehicleName = vehicle.model;										
						console.log(req.body.vehicleName)
						console.info('INFO -- MESSAGE: Vehicles returned with success');																				
					} else {					
						res.json(vehicle, {message: 'Veículos não encontrato'});
					}
				},
				function (error) {					
					res.status(501).json({message: 'Erro ao consultar veículo, por favor contate o administrador'});									
					console.error('ERROR -- 501, MESSAGE: Error to getting vehicle');										
				});
		}
*/						

		if(_id) {
			Moving.findByIdAndUpdate(_id, req.body)
				.exec()
				.then(function (moving) {						
					res.json(moving);
					console.info('INFO -- MESSAGE: Moving updated with success');														
				},	
				function (error){						
					res.status(500).json({message: 'Erro ao atualizar o movimento, por favor contate o administrador'});
					console.error('ERROR -- 500, MESSAGE: Error to update moving', {error: error});										
				});				   		
		} else {	
			Moving.create(req.body)			
				.then(function (moving) {					
					res.json(moving);
					console.info('INFO -- MESSAGE: Moving created with success');
				},
				function (error){
					res.status(500).json({message: 'Erro ao criar o movimento, por favor contate o administrador'});
					console.error('ERROR -- 500, MESSAGE: Error to create moving', {error: error});										
				});
	    }
	};


	controller.removeMoving = function (req, res) {
		var _id = sanitize(req.params._id);

		Moving.findById(_id).exec()
			.then(function (moving) {						
				if(!moving) {
					res.json(moving, {message: 'Movimento não encontrato'})
				} else {
					Moving.remove({"_id": moving._id}).exec()
						.then(function () {
							res.status(204).end();
							console.info('INFO -- MESSAGE: Moving deleted with success');
						},
						function(error) {
							return console.error(error);
						});	
				} 
			},
			function (error) {					
				res.status(500).json({message: 'Erro ao remover o movimento, por favor contate o administrador'});									
				console.error('ERROR -- 500, MESSAGE: Error to getting moving', {error: error});										
			});				
	};

	return controller;
}