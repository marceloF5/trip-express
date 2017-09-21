angular.module('tripExpress').controller('PricesController',
	function ($scope, $window, $location, User, UserOfCustomer, Customer) { 

		var location = $location.path() 
		
       	$scope.template = {
	    	"header": "header.html",
	    	"left": "left_admin.html"	    
  		};

        Customer.query(function (customers) {

			$scope.clients = customers;						
		});			

	  	$scope.alertMessage = false;	  

	  	function selectAllUsersByCustomer() {
	 		UserOfCustomer.query({customer: $window.sessionStorage.customer},
	 			function (users) {		 			
	 				$scope.users = users;
	 			}, 
	 			function (error) {	 				
	 				$scope.alertMessage = error;
                	$scope.typeMessage = 'danger';
                	$scope.message = error.data.message;
	 			});
	 	}	

		function selectAllUsers () {			
			User.query(
				function (users) {
					if (users.error) {
						$scope.alertMessage = users.error;
                    	$scope.typeMessage = 'danger';
                    	$scope.message = users.message;  	
					} else {										
						$scope.users = users;
					}						
				},
				function (error) {
					$scope.alertMessage = true;
                    $scope.typeMessage = 'danger';
                    $scope.message = error.data.message;    
				});	
		}

		$scope.init = function() {			       
			if (location == '/workspace_users') {
              selectAllUsersByCustomer();        											
	        } else {
    	 		selectAllUsers();        											
			};
		}

		$scope.init();		
	});