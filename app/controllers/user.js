module.exports = function (app) {

	var bcrypt = require('bcrypt-nodejs')
	  , sanitize = require('mongo-sanitize')  
	  , User = app.models.user
	  , controller = {};

	controller.selectAllUsers = function (req, res) {		
	 	User.find().exec()
			.then(function (users) {	
					if (users) {
						console.info('INFO -- MESSAGE: Users returned with successs');			
						res.json(users);							
					} else {
						console.info('INFO -- MESSAGE: Users does not exit');			 			
		 				res.json({error: true, message: 'Usuários não existem.'});
					}			
				},
				function (error) {
					console.error('ERROR -- 501, MESSAGE: The General Error');							
					res.status(501).json({message: 'Erro geral, por favor contate o administrador'});
				});		
	};

 	controller.selectDriverUser = function (req, res) {		
	 	User.find({role: 'UEM'}).exec()
			.then(function (schedules) {						
				res.json(schedules);							
				console.info('INFO -- MESSAGE: Schedule list returned with success');														
			},	
			function (error) {					
				res.status(500).json({message: 'Erro ao consultar lista de horários, por favor contate o administrador'});				
				console.error('ERROR -- 500, MESSAGE: Error to getting schedules list', {error: error});										
			});		
	};

	controller.selectUser = function (req, res) {	
	
		var _id = sanitize(req.params.userId);				
		User.findById(_id).exec()
			.then(function (user) {
					/*
						DESCRIPTOGRAFAR SENHAS ANTES DE APRESENTAR NA TELA.
					*/					
					if (user) {
						console.info('INFO -- MESSAGE: User selected with success');						
						res.json(user);																
					} else {
						console.info('INFO -- MESSAGE: User do not exit');			 			
		 				res.json({error: true, message: 'Usuário não existe. Por favor, contate o administrador'});											
					}
				},
				function (error) {
					console.error('ERROR -- CODE: 503 MESSAGE: The General Error');				 			
	 				res.status(503).json({message: 'Erro Geral, por favor contate o administrador'});											
				});	
	};	

	controller.selectUserSchedule = function (req, res) {			
		var _id = sanitize(req.params.user);						
		User.find({_id: _id}).exec()
			.then(function (user) {
				/*
					DESCRIPTOGRAFAR SENHAS ANTES DE APRESENTAR NA TELA.
				*/					
				if (user) {
					console.info('INFO -- MESSAGE: User selected with success');						
					res.json(user);																
				} else {
					console.info('INFO -- MESSAGE: User do not exit');			 			
	 				res.json({error: true, message: 'Usuário não existe. Por favor, contate o administrador'});											
				}
			},
			function (error) {
				console.error('ERROR -- CODE: 503 MESSAGE: The General Error');				 			
 				res.status(503).json({message: 'Erro Geral, por favor contate o administrador'});											
			});	
	};	

	controller.selectAllUserByCustomer = function (req, res) {
		var _id = sanitize(req.params.customer);

		User.find({client: _id}).exec()
			.then(function (user) {
				/*
					DESCRIPTOGRAFAR SENHAS ANTES DE APRESENTAR NA TELA.
				*/	
				if (user) {
					console.info('INFO -- MESSAGE: Users selected with success');						
					res.json(user);																
				} else {
					console.info('INFO -- MESSAGE: User do not exit');			 			
	 				res.json({error: true, message: 'Usuários não existem.'});
				}
			})


	}

	controller.saveUser = function (req, res) {
		
		var _id = req.body._id;	
	
		if (req.body.role == 'UAD' || req.body.role == 'UEM') {						
				req.body.client = null;				
		}

		if (!req.body.password || !req.body.passwordConfirm) {
			req.body.password = 'trip4vip';
			req.body.passwordConfirm = 'trip4vip';
		}		

		if(req.body.password != req.body.passwordConfirm) {		

			console.info('INFO -- CODE: 504 MESSAGE: Password and Password Confirmation are differents');					
			res.json(504, {message: 'Campo senha e confirmar senha devem ser iguais.'});				

		} else if((req.body.role == 'UCW' || req.body.role == 'UCM') && req.body.client == '')  {
			
			console.info('INFO -- CODE: 505 MESSAGE: Customer Field is required ');					
			res.json(505, {message: 'O usuário deve ser associado ao cliente'});				
		
		} else {
			/*
				QUALQUER UPDATE NO CADASTRO GERA A CRIPTOGRAFIA DA SENHA ATUAL
			*/
			bcrypt.genSalt(5, function(error, salt) {	    	
				bcrypt.hash(req.body.password, salt, null, function(error, hash) {  						      
					      	req.body.password = hash;		      
					      	req.body.passwordConfirm = hash;	      
					if (_id) {									
						User.findByIdAndUpdate(_id,
								{$set:{	login: req.body.login, 
						   			   	name: req.body.name,
						   				email: req.body.email,
						   				password: req.body.password,
						   				passwordConfirm: req.body.passwordConfirm,
						   				role: req.body.role,
						   				client: req.body.client,
					   					inactive: req.body.inactive}},
								req.body).exec()
							.then(function (user) {								
								res.json(user);
								console.info('INFO -- MESSAGE: User updated with success');
							},
							function (error){							
								console.error('ERROR -- CODE: 506 MESSAGE: User did not update' + error);								
								res.status(506).json({message: 'Erro ao atualizar o usuário, por favor contate o administrador'});												
							});				   	
					} else {									
						User.create(req.body)			
							.then(function (user) {																	
								console.info('INFO -- MESSAGE: User created with success');
								res.json(user);
							},
							function (error) {									
								console.error('ERROR -- CODE: 507 MESSAGE: User did not create');
								if (error.name == 'ValidationError') {
									if (error.errors.role) {
										res.status(507).json({message: 'Por favor, escolha um papel para o usuário'});															
									}									
								} else if (error.code) {
									if(error.code == 11000) {
										res.status(507).json({message: 'Usuário já está registrado na base'});
									}
								} else {
									console.log(error);
									res.status(508).json({message: 'Erro Geral, Contate o administrador'});															
								}																								
							});		
					}	      	
				});
			});
		}
	};
		
	return controller;

};