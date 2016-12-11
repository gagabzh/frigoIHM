'use strict';

angular.module('myApp.view3', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'view3/view3.html',
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
        serviceAjax.typePlatDispo().success(function(data) {
            $scope.availableTypes = data;
            $scope.availableTypes.push({name:'ALL'})
        });
        serviceAjax.saisonDispo().success(function(data) {
            $scope.availableSaison = data;
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
            serviceAjax.findRecette($scope.data).success(function(retour) {
                $scope.recipe = retour;
                $scope.filterRecipe= retour;
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