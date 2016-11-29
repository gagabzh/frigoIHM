'use strict';

angular.module('myApp.view1', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope','serviceAjax', function($scope,serviceAjax) {
        $scope.recipe = {};
        serviceAjax.recette().success(function(data) {
            $scope.recipe = data;
        });
    }]);