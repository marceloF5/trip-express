angular.module('tripExpress').factory('Vehicle',
	function ($resource) {
	
		return $resource('/vehicles/:vehicle');		

	});