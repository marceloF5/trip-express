angular.module('tripExpress').controller('UserController',
	function ($scope, $window, $routeParams, $location, User, Customer) { 	

		var location = $location.path() 
				
        if (location.split('/')[1] == 'workspace_users' || location.split('/')[1] == 'workspace_users_input') {
            $scope.template = {            
                "header": "header.html",
                "left": "left_workspace_customer.html"     
            };  
    		Customer.query({customerId: $window.sessionStorage.customer},
				function (customers) {						
					$scope.clients = customers;					
				});		
    		
        } else {
            $scope.template = {
		    	"header": "header.html",
		    	"left": "left_admin.html"	    
	  		};

			Customer.query(function (customers) {					
				$scope.clients = customers;				
			});
        }	
        
  		$scope.alertMessage = false;

  		$scope.disableField = false;

  		$scope.showPasswordField = true;

		/*User.query(function (users) {
			$scope.users = users;
		});*/

		$scope.saveUser = function () {									
			$scope.user.$save()
				.then(function (user) {							
					if (user.invalidPassword) {
						$scope.invalidPassword = true;													
					} else {							
						$scope.user = new User();
						if (location.split('/')[1] == 'workspace_users' || location.split('/')[1] == 'workspace_users_input') {
							$location.path("/workspace_users");		
						} else {
							$location.path("/users");			
						}
						
					}															
				})				
				.catch(function (error) {																		
                    $scope.alertMessage = true;
                    $scope.typeMessage = 'danger';
                    $scope.message = error.data.message;                        	                  
				});					
		}	

		if ($routeParams.userId) {	
			$scope.showPasswordField = false;							
			$scope.disableField = true ;			
			User.get({userId: $routeParams.userId},				
				function (user) {
					console.log(user)										;
					$scope.user = user;	
				},
				function (error) {
					console.log(error);
					if (error.status == 400) {
						console.log(error.data.error);						
					} else {
						console.log("Nao foi possivel obter a lista de usuario");														
					}					
				});
		} else {			
			$scope.user = new User();
			$scope.user.role = 'UAD';
		}	

	});