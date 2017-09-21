angular.module('tripExpress').controller('LoginController', 
	function ($scope, $routeParams, $window, $location, Login, AuthenticationService)  { 

        $scope.message = '';
        $scope.button = 'Entrar';
        $scope.typeMessage = '';
        $scope.alertMessage = false;     

    	$scope.authenticate = function logIn() {
            if (!$scope.user) {                
                $scope.alertMessage = true;
                $scope.typeMessage = 'danger';
                $scope.message = 'Por favor, preencher os campos usuário e senha.'                

            } else if ($scope.newPassword && $scope.newPasswordConfirm) {
                if ($scope.newPassword == $scope.newPasswordConfirm) {                    
                    $scope.user.password = $scope.newPassword;
                    Login.save({user: $scope.user, newPassword: $scope.newPassword, newPasswordConfirm: $scope.newPasswordConfirm},
                        function (res) {                                                                   
                            $scope.alertMessage = true;
                            $scope.typeMessage = 'success';
                            $scope.button = 'Entrar';                             
                            $scope.message = res.message;                    
                            $scope.newPassword = '';            
                            $scope.newPasswordConfirm = '';                
                            $location.path("/login");                                                                                                                                              
                        },
                        function (error) {
                            $scope.alertMessage = true;
                            $scope.typeMessage = 'danger';
                            $scope.button = 'Entrar';                       
                            $scope.message = res.message;
                        });                                                         
                } else {
                    $scope.alertMessage = true;
                    $scope.typeMessage = 'danger';
                    $scope.message = "Campo 'senha' e 'confirmar senha' devem ser iguais."
                    $scope.button = 'Entrar';                    
                }               
            } else {
                Login.save({user: $scope.user},
                    function (res) { 
                        if (res.error) {
                            $scope.alertMessage = true;
                            $scope.typeMessage = 'danger';                                                
                            $scope.message = res.message;
                        } else if(!res.authenticated) {
                            $scope.alertMessage = true;
                            $scope.typeMessage = 'warning';
                            $scope.button = 'Confirmar';                       
                            $scope.message = res.message;
                        } else if (res.authenticated) { 
                            AuthenticationService.isLogged = true;                                                        
                            $window.sessionStorage.token = res.token;
                            $window.sessionStorage.userId = res.user._id;
                            $window.sessionStorage.userName = res.user.login;                            
                            $window.sessionStorage.expires = res.expires;
                            $window.sessionStorage.role = res.user.role;     
                            $window.sessionStorage.customer = res.user.client;                   

                            if(res.user.role == 'UAD') {
                                $location.path("/home");                                                                          
                            } else {
                                $location.path("/workspace_customer");                                          
                            }
                            
                        }                                          
                    },
                    function (error) {                         
                        $scope.alertMessage = true;
                        $scope.typeMessage = 'danger';
                        $scope.message = error.data.message;                 
                    }
                );
            }
        };

        if($window.sessionStorage.userId && $window.sessionStorage.userName) {            

            $scope.userName = $window.sessionStorage.userName;    
        
            Login.get({userId: $window.sessionStorage.userId},             
                function (res) {                                                     
                    $window.sessionStorage.expires = res.expires;                    
                },
                function (error) {  
                    $scope.alertMessage = true;
                    $scope.typeMessage = 'danger';
                    $scope.message = error.data.error;                 
                    if (error.status == 498) {
                        console.log(error.data.error);                      
                    } else {
                        console.log("Nao foi possivel obter o usuario");                                                       
                    }                   
                });
        }

        $scope.logout = function logged() {            
            if (AuthenticationService.isLogged) {
                AuthenticationService.isLogged = false;
                delete $window.sessionStorage.token;
                delete $window.sessionStorage.userId;
                delete $window.sessionStorage.userName;
                delete $window.sessionStorage.expires;
                $location.path("/");
            }
        }
	    
	});