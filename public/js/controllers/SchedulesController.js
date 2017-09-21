angular.module('tripExpress').controller('SchedulesController', 
    function ($scope, $compile, $routeParams, $modal, $location, $window, uiCalendarConfig, Schedule, ScheduleUser, ScheduleCustomer, Customer, User) {
        
        var location = $location.path() 
        if (location == '/schedules_owner' || location == '/schedules_owner_vip') {
            $scope.template = {            
                "header": "header.html",
                "left": "left_workspace_owner.html"     
            };  
        } else {
            $scope.template = {            
                "header": "header.html",
                "left": "left_workspace_customer.html"     
            };  
        }

        $scope.schedule = new Schedule();           
        $scope.events = []; 

        Customer.query(function (customers) {            
            $scope.customers = customers;
        });

        User.query(function (users) {            
            $scope.users = users;
        });

        function validadeStatus(status) {
            if (status != "Sala Vip") {
                return true;
            } else {
                return false;
            }
        }

        function attr (calendar, index) {                            

                var yearStart = new Date(calendar.dateStart).getFullYear();
                var monthStart = new Date(calendar.dateStart).getMonth();
                var dayStart = new Date(calendar.dateStart).getDate();                
                var hoursStart = new Date(calendar.timeStart).getHours();                        
                var minutesStart = new Date(calendar.timeStart).getMinutes();        
                var hoursEnd = new Date(calendar.timeEnd).getHours();            
                var minutesEnd = new Date(calendar.timeEnd).getMinutes();                  
            
               $scope.events.push({
                    title: calendar.title,
                    color: calendar.color, //#337ab7 - BLUE // #CC0000 - RED // #DDAA00 -YELLOW  // #006600 - GREEN
                    start: new Date(yearStart, monthStart, dayStart, hoursStart, minutesStart),
                    customer: calendar.customer,
                    user: calendar.user,                        
                    timeStart: calendar.timeStart,                          
                    timeEnd: calendar.timeEnd,
                    addressType: calendar.addressType,
                    localOrigin: calendar.localOrigin,                        
                    localDestination: calendar.localDestination,                        
                    scheduleId: calendar._id,
                    drivers: calendar.driver,
                    vehicles: calendar.vehicle,                            
                    index: index                    
                });                
                  
        }
 
        function selectSchedulesByUser() {               
            ScheduleUser.query({user: $window.sessionStorage.userId},
                function (calendar) {                             
                for (var i = 0; i < calendar.length; i++) { 
                    if(validadeStatus(calendar[i].status)) {
                        attr(calendar[i], i);
                    }                        
                }                                                                            
            });               
        }   

        function selectSchedulesByCustomer() {                 
            ScheduleCustomer.query({customer: $window.sessionStorage.customer},
                function (calendar) {                             
                for (var i = 0; i < calendar.length; i++) { 
                    if(validadeStatus(calendar[i].status)) {
                        attr(calendar[i], i);
                    }                        
                }                                                                            
            });
        }   


        function selectAllSchedules() {            
            Schedule.query(function (calendar) {                             
                for (var i = 0; i < calendar.length; i++) { 
                    if(validadeStatus(calendar[i].status)) {
                        attr(calendar[i], i);
                    }                        
                }                                                                            
            });
        } 

        function selectAllSchedulesVip() {            
            Schedule.query(function (calendar) {                             
                for (var i = 0; i < calendar.length; i++) { 
                    if (calendar[i].status == "Sala Vip") {                               
                        attr(calendar[i], i);
                    }
                }                                                                            
            });
        }     

        function updateSchedule(event) {                              
            var modalInstance = $modal.open({
                templateUrl: '/partials/views_modals/modal_schedule_input.html',
                controller: 'ScheduleController',
                size: 'lg',
                resolve: {
                    schedule: function () {                               
                        return event;
                    }
                }                
            });   

            modalInstance.result.then(function (index) {
                if (index) {                
                    $scope.events.splice(index,1);                                 
                }                
                $('#calendar').fullCalendar('refetchEvents');                
            });    
        } 

        function updateTime (event, delta) {
            var deltaHours = delta.hours()*(-1);
            var deltaMinutes= delta.minutes()*(-1);

            var yearStartCurrently = new Date(event.start._i.getFullYear());
            var monthStartCurrently = new Date(event.start._i.getMonth());
            var dayStartCurrently = new Date(event.start._i.getDate());
            var hoursStartCurrently = new Date(event.start._i.getHours());                        
            var minutesStartCurrently = new Date(event.start._i.getMinutes());        
            var hoursEndCurrently = new Date(event.timeEnd).getHours();                        
            var minutesEndCurrently = new Date(event.timeEnd).getMinutes();        
            var hourStart = hoursStartCurrently - deltaHours;
            var minutesStart = minutesStartCurrently - deltaMinutes;    

            event.timeStart= new Date(yearStartCurrently, monthStartCurrently, dayStartCurrently, hourStart, minutesStart);            
            event.timeEnd= new Date(yearStartCurrently, monthStartCurrently, dayStartCurrently, hoursEndCurrently, minutesEndCurrently);            

            return event;
        }                    
        
        $scope.alertOnEventClick = function (event, date, jsEvent, view) {            
            updateSchedule(event);                                                                       
        };        

        $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view) {               
            updateSchedule(updateTime(event, delta));            
        };

        $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ) {             
            updateSchedule(updateTime(event, delta));            
        };

        $scope.changeView = function(view, schedule) {            
            uiCalendarConfig.calendars[schedule].fullCalendar('changeView',view);
        };

        $scope.renderCalendar = function(schedule) {
            if(uiCalendarConfig.calendars[schedule]){                
                uiCalendarConfig.calendars[schedule].fullCalendar('render');                
            }
        };

        $scope.eventRender = function(event, element, view ) {                
            element.attr({'tooltip': event.title,
                         'tooltip-append-to-body': true});
            $compile(element)($scope);            
        };   
        
        $scope.uiConfig = {            
            schedule:{
                events: 
                    function() {
                        if($window.sessionStorage.role == 'UAD' && location == '/schedules_owner_vip') {
                            selectAllSchedulesVip();
                        } else if ($window.sessionStorage.role == 'UAD') {
                            selectAllSchedules();    
                        } else if ($window.sessionStorage.role == 'UCW') {                                                      
                            selectSchedulesByCustomer();
                        } else {                            
                            selectSchedulesByUser();
                        }                     
                    },
                lang: 'pt-br',
                height: 450,
                editable: true,
                header:{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month agendaWeek agendaDay'                    
                },                
                dayClick: $scope.alertOnEventClick,
                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender,
                eventRenderCalendar: $scope.renderCalendar,
                changeView: $scope.changeView
            }
        };    

        $scope.eventSources = [$scope.events];      
});