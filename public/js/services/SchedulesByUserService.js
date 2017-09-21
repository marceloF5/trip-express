angular.module('tripExpress').factory('ScheduleUser',
	function ($resource) {
	
		return $resource('/schedulesByUser/:user');	

	});