angular.module('tripExpress').factory('Schedule',
	function ($resource) {
	
		return $resource('/schedules/:scheduleId');	

	});