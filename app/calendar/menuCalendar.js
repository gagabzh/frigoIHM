/**
 * Created by Gaga on 28/01/2017.
 */
'use strict';

angular.module('myApp.calendar', [
    'ngRoute',
    'ui.calendar',
    'ui.bootstrap'
])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/calendar', {
            templateUrl: 'calendar/menuCalendar.html',
            controller: 'calendar'
        });
    }])
    .controller('calendar', ['$scope','serviceAjax','labels',  function ($scope,serviceAjax,labels) {
        var date = new Date();
        // var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        $scope.labels = labels;
        $scope.onLoad = function(){
            $scope.events.slice(1);
            serviceAjax.getMenus().then(function(response) {
                var menus = response.data;
                $scope.menus = response.data;
                for (var i=0; i<menus.length; i++){
                    menus[i].title = labels.repasType[menus[i].typeRepas.name];
                    menus[i].start = menus[i].previsionalDate;
                    $scope.events.push(menus[i]);
                }
                $scope.$broadcast('menuCharged')
            });
        };
        /* event source that contains custom events on the scope */
        $scope.events = [];

        /* alert on eventClick */
        $scope.alertOnEventClick = function( date){
            console.log(date.typeRepas.name + ' was clicked ');
        };
        /* alert on Drop */
        $scope.alertOnDrop = function(event, delta){
            console.log('Event Droped to make dayDelta ' + delta);
            $scope.menus = $scope.events
        };
        /* alert on Resize */
        $scope.alertOnResize = function(event, delta){
            console.log('Event Resized to make dayDelta ' + delta);
        };
        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function(sources,source) {
            var canAdd = 0;
            angular.forEach(sources,function(value, key){
                if(sources[key] === source){
                    sources.splice(key,1);
                    canAdd = 1;
                }
            });
            if(canAdd === 0){
                sources.push(source);
            }
        };
        /* add custom event*/
        $scope.addEvent = function() {
            $scope.events.push({
                title: 'Open Sesame',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                className: ['openSesame']
            });

        };
        /* remove event */
        $scope.remove = function(index) {
            $scope.events.splice(index,1);

        };
        /* Change View */
        $scope.changeView = function(view,calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
        };
        /* Change View */
        $scope.renderCalender = function(calendar) {
            if(uiCalendarConfig.calendars[calendar]){
                uiCalendarConfig.calendars[calendar].fullCalendar('render');
            }
        };
        /* Render Tooltip */
        $scope.eventRender = function( event, element ) {
            element.attr({'tooltip': event.title,
                'tooltip-append-to-body': true});
        };
        /* config object */
        $scope.uiConfig = {
            calendar:{
                height: 450,
                editable: true,
                header:{
                    left: 'title',
                    center: '',
                    right: 'today prev,next'
                },
                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender,
                viewRender: function(view) {
                    console.log("View Changed: ", view.start.format(), view.end.format());
                    $scope.onLoad();

                },
                dayClick: function(date) {
                    console.log('Clicked on: ' + date.format());
                }
            }
        };
        /* event sources array*/
        $scope.eventSources = [$scope.events];
    }]);