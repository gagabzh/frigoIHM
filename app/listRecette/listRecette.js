'use strict';

angular.module('myApp.listRecette', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/listRecette', {
            templateUrl: 'listRecette/listRecette.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope','$rootScope','serviceAjax','labels', function($scope,$rootScope,serviceAjax,labels) {
        $scope.recipe = {};
        $scope.showRecipe = 1;
        $scope.label = labels;
        serviceAjax.recette().then(function(response) {
            $scope.recipe = response.data;
        });
        $scope.show=function (id) {
            $rootScope.showRecipe = id;
            $rootScope.$broadcast('RecipeChange')
        }

    }]);