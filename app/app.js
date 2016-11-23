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
}]).
factory('serviceAjax', function serviceAjax($http) {

    return{
        postRecette: function(data) {
            data.ingredient=[{"id":1}];
            return $http.post("http://localhost:8080/recipes",data);
        },
        recette: function() {
            return $http.get("http://localhost:8080/recipes");
        },
        produitDispo: function(){
            return $http.get("http://localhost:8080/products/witch")
        }

    };
}).
directive('ngAutocomplete', function($parse) {
        return{
            transclude: true,
            restrict: "E",
            templateUrl: "./autocomplete.html",
            scope: {
                },
            controller: ['$scope', 'serviceAjax', function($scope,serviceAjax){
                serviceAjax.produitDispo().success(function(data) {
                    $scope.availableProducts = data
                });
                $scope.search=''
                $scope.changment = function(){
                    $scope.filterProducts = $scope.availableProducts.filter(function(item){
                        return $scope.search && item.toLowerCase().startsWith($scope.search.toLowerCase())
                    })
                };
                $scope.remplir = function(prod){
                    $scope.search = prod;
                }
            }]
        }
});
