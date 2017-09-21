angular.module('tripExpress').controller('VehicleController',
	function ($scope, $routeParams, $location, Vehicle) { 


		$scope.brands = [	{_id: 00001, name: 'Chevrolet'},
							{_id: 00002, name: 'Fiat'},
							{_id: 00003, name: 'Ford'},
							{_id: 00004, name: 'Honda'},
							{_id: 00005, name: 'Hyundai'},
							//{_id: 00006, name: 'Kia'},
							//{_id: 00007, name: 'Mitsubishi'},
							//{_id: 00008, name: 'Peugeot'},
							{_id: 00006, name: 'Renault'},
							//{_id: 00010, name: 'Toyota'},
							{_id: 00007, name: 'Volkswagen'},						
						];

		$scope.fuels = [	{_id: 1, fuel: 'Etanol'},
							{_id: 2, fuel: 'Gasolina'},
							{_id: 3, fuel: 'Diesel'},
							{_id: 4, fuel: 'Flex (Etanol/Gasolina)'},										
						];
		$scope.template = {
		    "header": "header.html",
		    "left": "left_admin.html"	    
	  	};	  
	 
  	 	$scope.alertMessage = false;   	 	
  		
  		$scope.saveVehicle = function () {							
			$scope.vehicle.$save()
				.then(function (vehicle) {	
					if (vehicle.error) {					
						$scope.alertMessage = vehicle.error;
                		$scope.typeMessage = 'danger';
                    	$scope.message = vehicle.message;
					} else {
						$scope.vehicle = new Vehicle();
						$location.path("/vehicles");																													
					}																										
				})				
				.catch(function (error) {		
					console.log(error);
                    $scope.alertMessage = true;
                    $scope.typeMessage = 'danger';
                    $scope.message = error.data.message; 					
				});		
		}

		if ($routeParams.vehicle) {													
			Vehicle.get({vehicle: $routeParams.vehicle},				
				function (vehicle) {
					console.log(vehicle);
					$scope.vehicle = vehicle;											
				},
				function (error) {
                    $scope.alertMessage = true;
                    $scope.typeMessage = 'danger';
                    $scope.message = error.data.message; 
				}
			);
		} else {			
			$scope.vehicle = new Vehicle();				
			$scope.vehicle.idType = 'JUR';			
		}


	});