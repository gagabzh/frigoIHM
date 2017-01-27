/**
 * Created by Gaga on 02/12/2016.
 */
'use strict';

angular.module('myApp.listStock', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/listStock', {
            templateUrl: 'listStock/listStock.html',
            controller: 'View4Ctrl'
        });
    }])

    .controller('View4Ctrl', ['$scope','serviceAjax','labels', function($scope,serviceAjax,labels) {
        $scope.label = labels;
        $scope.category = {};
        $scope.stock = {};
        serviceAjax.categoryDispo().then(function(response) {
                $scope.category = response.data
            });
        serviceAjax.stockGestion().then(function(response) {
            $scope.stock = response.data
        });

    }]);