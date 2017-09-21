angular.module('tripExpress').controller('MenuController',
	function ($scope, $location, $window) { 
    		  
		$scope.active = function(location) {				
			return location === $location.path().split('/')[1];						
		}

		$scope.access = function() {
			
			if($window.sessionStorage.role == 'UAD') {
				return true;
			} else {
				return false;
			}		
		
		}
		
		$scope.xx = function() {
			if ($window.sessionStorage.role == 'UCW') {
				return true;
			} else {
				return false;
			}
		}

	});