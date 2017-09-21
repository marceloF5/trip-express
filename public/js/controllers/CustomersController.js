angular.module('tripExpress').controller('CustomersController',
	function ($scope, $window, $location, Customer) { 

		$scope.template = {
		    "header": "header.html",
		    "left": "left_admin.html"	    
	  	};

	  	$scope.message = '';

		function selectAllCustomers () {						
			Customer.query(
				function (customers) {
					if (customers.error) {
						//$scope.alertMessage = customers.error;
                    	//$scope.typeMessage = 'danger';
                    	$scope.message = customers.message;  
					} else {
						$scope.customers = customers;	
					}									
				},
				function (error) {
					$scope.message = error.message;									
				}
			);	
		}

		$scope.init = function() {			
			selectAllCustomers();		
		};

		$scope.init();
	});