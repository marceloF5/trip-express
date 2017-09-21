angular.module('tripExpress').controller('PriceController',
	function ($scope, $routeParams, $location, Vehicle) { 

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