'use strict';

angular.module('myApp.view1', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope','serviceAjax','labels', function($scope,serviceAjax,labels) {
        $scope.recipe = {};
        $scope.label = labels;
        serviceAjax.recette().success(function(data) {
            $scope.recipe = data;
        });

    }]);