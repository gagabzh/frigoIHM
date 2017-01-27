'use strict';

angular.module('myApp.findRecette', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/findRecette', {
            templateUrl: 'findRecette/findRecette.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', ['$scope','serviceAjax','labels', function($scope,serviceAjax,labels) {
        $scope.label = labels;
        $scope.create = false;
        $scope.availableTypes ={};
        $scope.recipe = {};
        $scope.filterRecipe= {};
        $scope.nbIngredient = [{id:1, product:''}];
        $scope.addIngredient = function(){
            $scope.nbIngredient.push({id:$scope.nbIngredient.length+1, product:''});
        };
        serviceAjax.typePlatDispo().then(function(response) {
            $scope.availableTypes = response.data;
            $scope.availableTypes.push({name:'ALL'})
        });
        serviceAjax.saisonDispo().then(function(response) {
            $scope.availableSaison = response.data;
            $scope.availableSaison.push({name:'ALL'})
            $scope.availableSaison.push({name:'DE_SAISON'})
        });
        // serviceAjax.recette().success(function(data) {
        //     $scope.recipe = data;
        //     //$scope.filterRecipe= data;
        // });

        $scope.filtreRecipe = function(){
            $scope.data={};
            $scope.data.products = $scope.nbIngredient;
            console.log($scope.data);
            serviceAjax.findRecette($scope.data).then(function(response) {
                $scope.recipe = response.data;
                $scope.filterRecipe= response.data;
                $scope.data = {};
                $scope.nbIngredient = [{id:1, product:''}];

            });
        };

        $scope.changement = function(){
            $scope.filterRecipe= {};
            if ($scope.typeFiltre==='ALL'){
                $scope.filterRecipe = $scope.recipe
            }else {
                $scope.filterRecipe = $scope.recipe.filter(function (item) {
                    return item.typePlat ===null || item.typePlat.name == $scope.typeFiltre
                });
            }
        };


    }]);