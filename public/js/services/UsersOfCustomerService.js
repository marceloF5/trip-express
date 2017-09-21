angular.module('tripExpress').factory('UserOfCustomer',
	function ($resource) {
	
		return $resource('/usersOfCustomer/:customer');		

	});