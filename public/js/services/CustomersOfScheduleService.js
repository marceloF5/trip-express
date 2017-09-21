angular.module('tripExpress').factory('CustomerOfSchedule',
	function ($resource) {
	
		return $resource('/customersOfSchedule/:customer');		

	});