angular.module('tripExpress', ['ngRoute', 'ngResource', 'ui.calendar', 'ui.bootstrap', 'ngMask'])
	.config(function ($routeProvider, $httpProvider) {		

		$httpProvider.interceptors.push('TokenInterceptor');				

		$routeProvider.when('/login', {
			templateUrl: '/partials/login.html',
			controller: 'LoginController'
		});

		$routeProvider.when('/home', {
			templateUrl: '/partials/main_admin.html',			
			controller: 'HomeController',
			access: { requiredLogin: true }
		});

		$routeProvider.when('/customers', {
			templateUrl: '/partials/views/admin_customers.html',
			controller: 'CustomersController',
			access: { requiredLogin: true }
		});

		$routeProvider.when('/customer_input', {
			templateUrl: '/partials/views/admin_customers_input.html',
			controller: 'CustomerController',
			access: { requiredLogin: true }
		});

		$routeProvider.when('/customers/:customerId', {
			templateUrl: '/partials/views/admin_customers_input.html',
			controller: 'CustomerController',
			access: { requiredLogin: true }
		});

		$routeProvider.when('/vehicles', {
			templateUrl: '/partials/views/admin_vehicles.html',
			controller: 'VehiclesController',
			access: { requiredLogin: true }
		});

		$routeProvider.when('/vehicles_input', {
			templateUrl: '/partials/views/admin_vehicles_input.html',
			controller: 'VehicleController',
			access: { requiredLogin: true }
		});		
		
		$routeProvider.when('/vehicles/:vehicle', {
			templateUrl: '/partials/views/admin_vehicles_input.html',
			controller: 'VehicleController',
			access: { requiredLogin: true }
		});		
//TRABALHANDO AQUI
		$routeProvider.when('/prices', {
			templateUrl: '/partials/views/admin_prices.html',
			controller: 'PricesController',
			access: { requiredLogin: true }
		});

		$routeProvider.when('/prices_input', {
			templateUrl: '/partials/views/admin_prices_input.html',
			controller: 'PriceController',
			access: { requiredLogin: true }
		});		
		
		$routeProvider.when('/prices/:prices', {
			templateUrl: '/partials/views/admin_prices_input.html',
			controller: 'PriceController',
			access: { requiredLogin: true }
		});	
//TRABALHANDO AQUI
		$routeProvider.when('/users', {
			templateUrl: 'partials/views/admin_users.html',
			controller: 'UsersController',
			access: { requiredLogin: true }
		});

		$routeProvider.when('/user_input', {
			templateUrl: 'partials/views/admin_users_input.html',
			controller: 'UserController',
			access: { requiredLogin: true }			
		});

		$routeProvider.when('/users/:userId', {
			templateUrl: 'partials/views/admin_users_input.html',
			controller: 'UserController',
			access: { requiredLogin: true }

		});

		$routeProvider.when('/workspace_customer', {
			templateUrl: '/partials/main_workspace_customer.html',
			controller: 'WorkspaceCustomerController',
			access: { requiredLogin: true }
		}); 

		$routeProvider.when('/schedules', {
			templateUrl: '/partials/views/workspace_customer_schedule.html',
			controller: 'SchedulesController',
			access: { requiredLogin: true }
		});

		$routeProvider.when('/workspace_users', {
			templateUrl: '/partials/views/workspace_users.html',
			controller: 'UsersController',
			access: { requiredLogin: true }
		});

		$routeProvider.when('/workspace_users/:userId', {
			templateUrl: '/partials/views/workspace_users_input.html',
			controller: 'UserController',
			access: { requiredLogin: true }
		}); 

		$routeProvider.when('/workspace_users_input', {
			templateUrl: '/partials/views/workspace_users_input.html',
			controller: 'UserController',
			access: { requiredLogin: true }
		}); 

		$routeProvider.when('/workspace_owner', {
			templateUrl: '/partials/main_workspace_owner.html',
			controller: 'WorkspaceOwnerController',
			access: { requiredLogin: true }
		});

		$routeProvider.when('/schedules_owner', {
			templateUrl: '/partials/views/workspace_owner_schedule.html',
			controller: 'SchedulesController',
			access: { requiredLogin: true }
		});

		$routeProvider.when('/schedules_owner_vip', {
			templateUrl: '/partials/views/workspace_owner_vip_schedule.html',
			controller: 'SchedulesController',
			access: { requiredLogin: true }
		});

//TRABALHANDO AQUI
		$routeProvider.when('/workspace_services', {
			templateUrl: '/partials/views/workspace_services.html',
			controller: 'ServicesController',
			access: { requiredLogin: true }
		});

		$routeProvider.when('/workspace_users/:userId', {
			templateUrl: '/partials/views/workspace_users_input.html',
			controller: 'UserController',
			access: { requiredLogin: true }
		}); 

		$routeProvider.when('/workspace_services_input', {
			templateUrl: '/partials/views/workspace_services_input.html',
			controller: 'ServiceController',
			access: { requiredLogin: true }
		}); 
//TRABALHANDO AQUI

		$routeProvider.otherwise({redirectTo: '/login'});		

	});
