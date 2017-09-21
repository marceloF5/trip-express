angular.module('tripExpress').factory('ScheduleCustomer',
	function ($resource) {
	
		return $resource('/schedulesByCustomer/:customer');	

	});