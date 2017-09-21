angular.module('tripExpress').factory('Login',
	function ($resource) {
	
		return $resource('/login/:userId');		

	});