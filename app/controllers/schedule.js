module.exports = function (app) {

	var sanitize = require('mongo-sanitize')
      , Schedule = app.models.schedule 
      , moment = require('moment')      
      , controller = {};


    function parseStringDate(schedule) {
		for (var i = 0; i < schedule.length; i++){						
			schedule[i].dateStart = new Date(Date.parse(schedule[i].dateStart)).toJSON();
			schedule[i].timeStart = new Date(Date.parse(schedule[i].timeStart)).toJSON();
			schedule[i].timeEnd = new Date(Date.parse(schedule[i].timeEnd)).toJSON();						
		}
		return schedule;
    }

 	controller.selectAllSchedules = function (req, res) {		
	 	Schedule.find().exec()
			.then(function (schedules) {					
				res.json(schedules);										
				console.info('INFO -- MESSAGE: Schedule list returned with success');														
			},	
			function (error) {					
				res.status(500).json({message: 'Erro ao consultar lista de horários, por favor contate o administrador'});				
				console.error('ERROR -- 500, MESSAGE: Error to getting schedules list', {error: error});										
			});		
	};

	controller.selectScheduleByCustomer = function(req, res) {
		var _id = req.params.customer;

		Schedule.find({customer: _id}).exec()
			.then(function (schedule) {						
				if(!schedule) {
					res.json({error: true, message: 'Horário não encontrado'})
				}				
				res.json(schedule);
				console.info('INFO -- MESSAGE: Schedule returned with success');														
			},
			function (error) {					
				res.status(500).json({message: 'Erro ao consultar o horário, por favor contate o administrador'});									
				console.error('ERROR -- 500, MESSAGE: Error to getting schedule', {error: error});										
			});

	}

	controller.selectScheduleByUser = function (req, res) {			
		var _id = req.params.user;			
		
		Schedule.find({user: _id}).exec()
			.then(function (schedule) {						
				if(!schedule) {
					res.json({error: true, message: 'Horário não encontrado'})
				} else {					
					parseStringDate(schedule);																						
					res.json(schedule);					
					console.info('INFO -- MESSAGE: Schedule returned with success');															
				}									
			},
			function (error) {					
				res.status(500).json({message: 'Erro ao consultar o horário, por favor contate o administrador'});									
				console.error('ERROR -- 500, MESSAGE: Error to getting schedule', {error: error});										
			});
	};

	controller.selectScheduleByDriver = function (req, res) {			
		var _id = req.params.user;			
		
		Schedule.find({driver: _id}).exec()
			.then(function (schedule) {						
				if(!schedule) {
					res.json({error: true, message: 'Horário não encontrado'})
				} else {					
					parseStringDate(schedule);																						
					res.json(schedule);					
					console.info('INFO -- MESSAGE: Schedule returned with success');															
				}									
			},
			function (error) {					
				res.status(500).json({message: 'Erro ao consultar o horário, por favor contate o administrador'});									
				console.error('ERROR -- 500, MESSAGE: Error to getting schedule', {error: error});										
			});
	};

	controller.saveSchedule = function (req, res) {

		var _id = req.body.scheduleId;	

		req.body.dateStart = new Date(req.body.dateStart).toLocaleString();
		req.body.timeStart = new Date(req.body.timeStart).toLocaleString();
		req.body.timeEnd = new Date(req.body.timeEnd).toLocaleString();

		if(_id) {			
			Schedule.findByIdAndUpdate(_id, req.body)
				.exec()
				.then(function (schedule) {						
						res.json(schedule);
						console.info('INFO -- MESSAGE: Schedule updated with success');														
				},	
				function (error){						
					res.status(500).json({message: 'Erro ao atualizar o evento, por favor contate o administrador'});
					console.error('ERROR -- 500, MESSAGE: Error to update event', {error: error});										
				});				   		
		} else {	
			Schedule.create(req.body)			
				.then(function (schedule) {					
					res.json(schedule);
					console.info('INFO -- MESSAGE: Schedule created with success');
				},
				function (error){
					res.status(500).json({message: 'Erro ao criar o evento, por favor contate o administrador'});
					console.error('ERROR -- 500, MESSAGE: Error to create event', {error: error});										
				});
	    }
	};

	controller.removeSchedule = function (req, res) {
		var _id = sanitize(req.params.scheduleId);

		Schedule.findById(_id).exec()
			.then(function (schedule) {						
				if(!schedule) {
					res.json(schedule, {message: 'Horário não encontrato'})
				} else {//if(schedule.color == '#DDAA00'){
					Schedule.remove({"_id": schedule._id}).exec()
						.then(function () {
							res.status(204).end();
						},
						function(error) {
							return console.error(error);
						});	
				} /*else {
					console.info('INFO -- MESSAGE:  It was not possible delete schedule');
					res.json({error: true, message: 'Nao eh possivel excluir uma agenda confirmada, por favor contate a equipe Trip4Vip'});	
				}	*/								
			},
			function (error) {					
				res.status(500).json({message: 'Erro ao consultar o horário, por favor contate o administrador'});									
				console.error('ERROR -- 500, MESSAGE: Error to getting schedule', {error: error});										
			});				
	};
		
	return controller;	

};