angular.module('tripExpress').factory('User',
	function ($resource) {
	
		return $resource('/users/:userId');		

	});