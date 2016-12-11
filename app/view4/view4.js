/**
 * Created by Gaga on 02/12/2016.
 */
'use strict';

angular.module('myApp.view4', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view4', {
            templateUrl: 'view4/view4.html',
            controller: 'View4Ctrl'
        });
    }])

    .controller('View4Ctrl', ['$scope','serviceAjax','labels', function($scope,serviceAjax,labels) {
        $scope.label = labels;
        $scope.category = {};
        $scope.stock = {};
        serviceAjax.categoryDispo().success(function(data) {
                $scope.category = data
            });
        serviceAjax.stockGestion().success(function(data) {
            $scope.stock = data
        });

    }]);