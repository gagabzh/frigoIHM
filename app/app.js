'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap',
    'myApp.view1',
    'myApp.view2',
    'myApp.view3',
    'myApp.version',
    'myApp.productModal'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/view1'});
}]).
factory('serviceAjax', function serviceAjax($http) {

    return{
        postRecette: function(data) {
            return $http.post("http://localhost:8080/recipes/deepSave",data);
        },
        postProduit: function(data) {
            return $http.post("http://localhost:8080/products/deepSave",data);
        },
        recette: function() {
            return $http.get("http://localhost:8080/recipes");
        },
        findRecette: function(data) {
            return $http.post("http://localhost:8080/recipes/findWith",data);
        },
        produitDispo: function(){
            return $http.get("http://localhost:8080/products/witch")
        },
        unitDispo: function(){
            return $http.get("http://localhost:8080/quantities/witchUnit")
        },
        typePlatDispo: function(){
            return $http.get("http://localhost:8080/recipes/witchType")
        },
        saisonDispo: function(){
            return $http.get("http://localhost:8080/products/witchSeason")
        },
        costDispo: function(){
            return $http.get("http://localhost:8080/products/witchCost")
        },
        durationDispo: function(){
            return $http.get("http://localhost:8080/products/witchDuration")
        },
        categoryDispo: function(){
            return $http.get("http://localhost:8080/categories/index")
        }

    };
}).
directive('ngAutocomplete', function() {
        return{
            transclude: true,
            restrict: "EA",
            templateUrl: "./autocomplete.html",
            scope: {
                twoWayBind: "=myTwoWayBind",
                canAdd: "=canAdd",
                },
            controller: ['$scope', 'serviceAjax','$uibModal', function($scope,serviceAjax,$uibModal){
                serviceAjax.produitDispo().success(function(data) {
                    $scope.availableProducts = data
                });
                $scope.twoWayBind.product="";
                $scope.search='';
                $scope.changement = function(){
                    $scope.filterProducts = $scope.availableProducts.filter(function(item){
                        return $scope.search && item.toLowerCase().startsWith($scope.search.toLowerCase())
                    });
                    $scope.show = true;
                    $scope.twoWayBind.product= $scope.search;
                };
                $scope.remplir = function(prod){
                    $scope.search = prod;
                    $scope.twoWayBind.product= $scope.search;
                    $scope.show = false;
                };

                $scope.showModalProduct=function () {
                    $scope.show = false;
                    $uibModal.open({
                        animation: true,
                        templateUrl: 'productModal.html',
                        controller: 'productModalCtrl',
                        resolve: {
                            items: function () {
                                return $scope.search;
                            }
                        }
                    }).result.then(function(product){
                        serviceAjax.produitDispo().success(function(data) {
                            $scope.availableProducts = data
                        });
                        $scope.search=product.name;

                        console.log(product)
                    });

                };
            }]
        }
});