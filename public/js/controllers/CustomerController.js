angular.module('tripExpress').controller('CustomerController',
	function ($scope, $routeParams, $location, Customer) { 

		$scope.template = {
		    "header": "header.html",
		    "left": "left_admin.html"	    
	  	};	  
	  	
	  	$scope.show = function () {
	  		if($scope.customer) {	  			
		  		if ($scope.customer.idType == 'JUR') {		  			
		  			$scope.customer.idNumberCPF = '';
			  		return true;
			  	} else {			  		
			  		$scope.customer.idNumberCNPJ = '';
			  		return false;
			  	}
		  	}
	  	} 
	 
  	 	$scope.alertMessage = false; 
  		
  		$scope.saveCustomer = function () {
  			if ($scope.customer.idType == 'JUR') {		  			
	  			$scope.customer.idNumberCPF = $scope.customer.idNumberCNPJ;
		  	} else {			  		
		  		$scope.customer.idNumberCNPJ = $scope.customer.idNumberCPF;		  		
		  	}								
			$scope.customer.$save()
				.then(function (customer) {	
					if (customer.error) {
						$scope.alertMessage = customer.error;
                		$scope.typeMessage = 'danger';
                    	$scope.message = customer.message;
					} else {
						$scope.customer = new Customer();
						$location.path("/customers");																													
					}																										
				})				
				.catch(function (error) {		
                    $scope.alertMessage = true;
                    $scope.typeMessage = 'danger';
                    $scope.message = error.data.message; 					
				});		
		}

		if ($routeParams.customerId) {													
			Customer.query({customerId: $routeParams.customerId},				
				function (customer) {													
					$scope.customer = customer[0];						
				},
				function (error) {
                    $scope.alertMessage = true;
                    $scope.typeMessage = 'danger';
                    $scope.message = error.data.message; 
				}
			);
		} else {			
			$scope.customer = new Customer();				
			$scope.customer.idType = 'JUR';			
		}


	});