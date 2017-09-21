angular.module('tripExpress').factory('AuthenticationService', 
    function() {
        var auth = {
            isLogged: false
        }
        return auth;
    });

angular.module('tripExpress').factory('TokenInterceptor', 
    function ($q, $window, AuthenticationService, $location) {
        return {
            request: function (config) {
                config.headers = config.headers || {};            
                if ($window.sessionStorage.token) {   
                    config.headers.User = $window.sessionStorage.userId;                                     
                    config.headers.Authorization = $window.sessionStorage.token; 
                    config.headers.Expires = $window.sessionStorage.expires;              
                }
                return config;
            },
     
            requestError: function (rejection) {                                          ;
                return $q.reject(rejection);
            },
    
            response: function (response) {                      
                if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isLogged) {                                                               
                    AuthenticationService.isLogged = true;
                }
                return response || $q.when(response);
            },
                 
            responseError: function (rejection) {                  
                if (rejection != null && (rejection.status == 498 || rejection.status == 401)) {                                      
                    delete $window.sessionStorage.token;                    
                    delete $window.sessionStorage.userId;
                    delete $window.sessionStorage.userName;
                    delete $window.sessionStorage.expires;
                    delete $window.sessionStorage.role;
                    AuthenticationService.isLogged = false;
                    $location.path("/login");
                }
     
                return $q.reject(rejection);
            }
        };
    });

/*angular.module('tripExpress').run(function($rootScope, $location, AuthenticationService) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {        
        if (!AuthenticationService.isLogged) {
            $location.path("/login");
        }
    });
});*/
