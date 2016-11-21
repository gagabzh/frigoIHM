'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/view1'});
}])
    .factory('serviceAjax', function serviceAjax($http) {

    return{
        postRecette: function(data) {
            data.ingredient=[{"id":1}];
            console.log(data);
            return $http.post("http://localhost:8080/recipes",data);
        },
        popular: function() {
            return $http.get("http://localhost:8080/recipes");
        }
    };
});
