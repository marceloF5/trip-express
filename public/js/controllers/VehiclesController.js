angular.module('tripExpress').controller('VehiclesController',
	function ($scope, $window, $location, Vehicle) { 

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
							{_id: 4, fuel: 'Flex (Etanol/Gasolina)'}
						];

		$scope.template = {
		    "header": "header.html",
		    "left": "left_admin.html"	    
	  	};

	  	$scope.alertMessage = false;

		function selectAllVehicles () {			
			Vehicle.query(
				function (vehicles) {
					if (vehicles.error) {
						$scope.alertMessage = vehicles.error;
                    	$scope.typeMessage = 'danger';
                    	$scope.message = vehicles.message;  	
					} else {
						$scope.vehicles = vehicles;
					}						
				},
				function (error) {
					$scope.alertMessage = true;
                    $scope.typeMessage = 'danger';
                    $scope.message = error.data.message;    
				}
			);	
		}

		$scope.init = function() {			
			selectAllVehicles();		
		};

		$scope.init();	
	});