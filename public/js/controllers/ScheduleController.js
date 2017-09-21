angular.module('tripExpress').controller('ScheduleController', 
    function ($scope, $location, $window, $modalInstance, schedule, Schedule, User, Vehicle, DriverUsers, UserOfSchedule, UserOfCustomer, Customer, CustomerOfSchedule) {

        $scope.UAD = false;

        $scope.disableFieldAddress = true;

        if ($window.sessionStorage.role == 'UAD') {
            $scope.UAD = true;
            Customer.query(function (customers) {                                           
                $scope.customers = customers;
            });

            User.query(function (users) {            
                $scope.users = users;
            });

        } else if ($window.sessionStorage.role == 'UCW') {                
            CustomerOfSchedule.query({customer: $window.sessionStorage.customer},
                function (customer) {                     
                    $scope.customers = customer;                    
                }); 
            
            UserOfCustomer.query({customer: $window.sessionStorage.customer},
                function (user) {                                         
                    $scope.users = user;
                });                             
        } else {
            CustomerOfSchedule.query({customer: $window.sessionStorage.customer},
                function (customer) {                                                                   
                    $scope.customers = customer;                    
                }); 
            
            UserOfSchedule.query({user: $window.sessionStorage.userId},
                function (user) {                     
                    $scope.users = user;
                });                             
        } 

        DriverUsers.query(function(drivers) {
            $scope.drivers = drivers;
        })

        Vehicle.query(function (vehicles) {
            $scope.vehicles = vehicles;
        });

        if (!schedule) {
            schedule  = new Schedule();            
        }

        if(schedule._id) {            
                        
            $scope.disableField = true;        

            if (schedule.color == "#DDAA00") {
                $scope.disableField = false;
            }   

            console.log(schedule.addressType);

            $scope.title = schedule.title;
            $scope.customer = schedule.customer;            
            $scope.user = schedule.user;
            $scope.color = schedule.color;
            $scope.dateStart = new Date(schedule.start);            
            $scope.timeStart = new Date(schedule.timeStart);    
            $scope.timeEnd = new Date(schedule.timeEnd);    
            $scope.addressType = schedule.addressType;
            $scope.localOrigin = schedule.localOrigin;              
            $scope.localDestination = schedule.localDestination;                
            $scope.scheduleId = schedule.scheduleId;
            $scope.index = schedule.index;
            $scope.driver = schedule.drivers;
            $scope.vehicle = schedule.vehicles;            

        } else {
            $scope.disableField = false;   
            $scope.dateStart = new Date();                    
        }
        
        $scope.saveSchedule = function () {              
            
            $scope.schedule = new Schedule(); 

            for (var i = 0; i < $scope.drivers.length; i++) {
                if ($scope.driver == $scope.drivers[i]._id) {
                    $scope.driverName = $scope.drivers[i].name;
                }            
            }

            for (var i = 0; i < $scope.vehicles.length; i++) {
                if ($scope.vehicle == $scope.vehicles[i]._id) {                    
                    $scope.vehicleModel = $scope.vehicles[i].model + ' - ' + $scope.vehicles[i].license;                    
                }            
            }  

            $scope.schedule.title = $scope.title;
            $scope.schedule.customer = $scope.customer;            
            $scope.schedule.user = $scope.user;
            $scope.schedule.color = $scope.color;
            $scope.schedule.dateStart = $scope.dateStart;            
            $scope.schedule.timeStart = $scope.timeStart;    
            $scope.schedule.timeEnd = $scope.timeEnd;    
            $scope.schedule.addressType = $scope.addressType;  
            $scope.schedule.localOrigin = $scope.localOrigin;  
            $scope.schedule.localDestination = $scope.localDestination;    
            $scope.schedule.driver = $scope.driver;
            $scope.schedule.driverName = $scope.driverName;
            $scope.schedule.vehicle = $scope.vehicle;
            $scope.schedule.vehicleModel = $scope.vehicleModel;
            $scope.schedule.status = 'Pendente de Confirmação';
            $scope.schedule.scheduleId = $scope.scheduleId;    
                                                                    
            if($scope.schedule.status == 'Pendente de Confirmação') {
                if($scope.schedule.color == undefined && !$scope.UAD) {
                    $scope.schedule.color = '#DDAA00';                 
                } else if ($scope.UAD) {
                    $scope.schedule.color = '#006600';  
                    $scope.schedule.status = 'Confirmado '               
                }
            }
                                        
            if ($scope.schedule.timeEnd <= $scope.schedule.timeStart) {
                $scope.alertMessage = true;
                $scope.typeMessage = 'danger';
                $scope.message = 'Horario de Chegada não pode ser igual ou menor que Horario Inicial';         
            } else {
                $scope.schedule.$save()
                    .then(function (schedule) {                                                                                     
                        //$scope.schedule = new Schedule();                                                                                                               
                    })               
                    .catch(function (error) {                        
                        $scope.typeMessage = error.message;
                        $scope.alertMessage = true;
                    });  
                $modalInstance.close(); 
            }        
        }; 

        $scope.defaultAddress = function() {            
            if ($scope.addressType == 'ESC') {
                $scope.disableFieldAddress = true;
                for (var i = 0; i < $scope.customers.length; i++) {
                    console.log($scope.customers[i]);
                    if ($scope.customer == $scope.customers[i]._id) {                        
                        $scope.localOrigin = $scope.customers[i].address;                        
                    }
                }  
            } else if ($scope.addressType == 'ENA') {
                $scope.disableFieldAddress = true;
                for (var i = 0; i < $scope.users.length; i++) {                    
                    console.log($scope.users[i]);
                    if ($scope.user == $scope.users[i]._id) {                                                                       
                        $scope.localOrigin = $scope.users[i].address;
                    }
                }  
            } else if ($scope.addressType == 'OUT') {
                $scope.localOrigin = "";
                $scope.disableFieldAddress = false;
            }

        }

        $scope.enableFields = function() {
             $scope.disableField = false;
        }

        $scope.cancel = function () {            
            $modalInstance.close(); 
        };

        $scope.remove = function(scheduleId) {            
            Schedule.delete({scheduleId: scheduleId}),            
                function (error) {
                    $scope.typeMessage = error.message;
                    $scope.alertMessage = true;
                }            
        
            $modalInstance.close(scheduleId); 
        };
});