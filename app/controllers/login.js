module.exports = function (app) {

	var sanitize = require('mongo-sanitize')
	  , bcrypt = require('bcrypt-nodejs')
      , jwt = require('jwt-simple')
      , moment = require('moment')
  	  , secret = 'mySecretToken';

	var User = app.models.user;

	var controller = {};

	controller.logged = function (req, res) {		
		try {			

			var _id = sanitize(req.params.userId);
			
			User.findById(_id)
				.select ('name')
				.exec()
				.then(function (user) {					
						if(!user) {
							res.json(user, {message: 'Usuário não encontrato'})
						}					
						var expires = moment().add(1,'day').valueOf();					
						res.json({expires: expires});						
					},
					function (error) {					
						res.status(500).json({message: 'Erro ao consultar o usuário, por favor contate o administrador'});															
						console.error('ERROR -- 500, MESSAGE: Error to getting user');										
						console.error(error);
					});
		} catch (error) {
			console.error('ERROR -- 500, MESSAGE: The General error');		
			return res.status(500).json({message: 'Erro geral, por favor contate o administrador'});								
		} 
	}

	controller.authenticate = function (req, res) {							
		try {		
				
			User.findOne({login: req.body.user.login})
	 		.select ('login name email password role client inactive address')
	 		.exec()
	 		.then(
	 			function (user) {	 				
	 				if(user) {
			 			var password = req.body.user.password;			 					 			
			 			if (!user.inactive) {			 					 								 				
			 				bcrypt.compare(password, user.password, function (error, isMatch) {				 								 					
								if (error){
									console.error('ERROR -- 500, MESSAGE: The General error');
									res.status(500).json({message: 'Erro geral, por favor contate o administrador'});									
								} else if (req.body.newPassword && req.body.newPasswordConfirm) {
									User.findOne({login: req.body.user.login})
								 		.select ('_id login email password passwordConfirm')
								 		.exec()
								 		.then(
								 			function (user) {	 				
								 				if(user) {	
								 					bcrypt.genSalt(5, function(error, salt) {	    	
												    	bcrypt.hash(req.body.newPassword, salt, null, function(error, hash) {  						      
													      	user.password = hash;		      
													      	user.passwordConfirm = hash;				      
									 						User.findByIdAndUpdate(user._id, {$set:{password: user.password, passwordConfirm: user.passwordConfirm}}, user)
									 							.exec()
									 							.then(
										 							function(user) {	
											 							console.info('INFO -- MESSAGE: Password saved with success');										
																		res.json({authenticated: false, message: 'Senha alterada com sucesso'});							 																	 								
										 							},
										 							function(error) {
										 								console.error('ERROR -- 500, MESSAGE: Problem to save password. Password was not saved');																												
																		res.status(500).json({message: 'Não foi possivel atualizar a senha. Por favor, entre em contato com o administrator.'});
										 							}
									 							);			   	
													    });
												  	});								 								 				
										 		}	
								 			},
								 			function (error) {
							 					console.error('ERROR -- 500, MESSAGE: It was not possible get user');												
												res.status(500).json({message: 'Erro ao atualizar a senha. Por favor, entre em contato com o administrator.'});				
								 			}
										);			
								} else if (!isMatch) {																		
									console.info('INFO -- MESSAGE:  Incorrect User or Password');									
									res.json({error: true, message: 'Usuário ou senha estão incorretos.'});										
								} else if (isMatch) {									
									if (password == 'trip4vip') {												
										console.info('INFO -- MESSAGE: First Connection');										
										res.json({authenticated: false, message: 'Por favor, digite o uma nova senha e confirme'});	
									} else {																												
										console.info('INFO -- MESSAGE: Success Access');
										var expires = moment().add(1,'day').valueOf();
									    var token = jwt.encode({
									      iss: user._id,		
									      exp: expires							      
									    }, secret);		
									    console.log('id MOTO: ' + user._id + ' TOKEN: ' + token);
									    res.json({authenticated: true, token: token, expires: expires, user: user}); 
									} 									
								}																															
						 	}); 
	 					} else {	
	 						console.info('INFO -- MESSAGE: User inactive or blocked');			 							 		
				 			res.json({error: true, message: 'Usuário inativo ou bloqueado'});				 							 			
				 		}					
			 		} else {
			 			console.info('INFO -- MESSAGE: User does not exit');			 						 						 		
			 			res.json({error: true, message: 'Usuário não existe. Por favor, contate o administrador'});			 						 			
			 		}	
	 			},
	 			function (error) {
	 				console.error('ERROR -- 500, MESSAGE: The General error');
					res.status(500).json({message: 'Erro geral, por favor contate o administrador'});					
	 			}
 			);			
		} catch (error) {
			console.error('ERROR -- 500, MESSAGE: The General error');					
			return res.status(500).json({message: 'Erro geral, por favor contate o administrador'});								
		}	 
 	};
 	return controller;	 
};
