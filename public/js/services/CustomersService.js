angular.module('tripExpress').factory('Customer',
	function ($resource) {
	
		return $resource('/customers/:customerId');		

	});