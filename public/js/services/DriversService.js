angular.module('tripExpress').factory('DriverUsers',
	function ($resource) {
	
		return $resource('/driverUsers');	

	});