angular.module('tripExpress').controller('ServiceController',
	function ($scope, $window, $location, User, UserOfCustomer, Customer) { 

		var location = $location.path() 
		
       	$scope.template = {
	    	"header": "header.html",
	    	"left": "left_workspace_owner.html"	    
  		};

       
		//$scope.init();		
	});