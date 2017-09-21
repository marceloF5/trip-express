angular.module('tripExpress').factory('UserOfSchedule',
	function ($resource) {
	
		return $resource('/usersOfSchedule/:user');		

	});