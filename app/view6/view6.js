/**
 * Created by Gaga on 04/12/2016.
 */
'use strict';

angular.module('myApp.view6', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/stock/:id', {
            templateUrl: 'view6/view6.html',
            controller: 'View6Ctrl'
        });
    }])

    .controller('View6Ctrl', ['$scope','serviceAjax','labels','$routeParams','$uibModal',
        function($scope,serviceAjax,labels,$routeParams,$uibModal) {
            $scope.label = labels;
            $scope.id = $routeParams.id;
            $scope.data={};
            serviceAjax.detailProduct($scope.id).success(function (data) {
                $scope.item = data;
                $scope.data.products = [{product: $scope.item.product.name}];
                serviceAjax.findRecette($scope.data).success(function(retour) {
                    $scope.recipe = retour;
                    console.log($scope.recipe)
                });
            });
        }]);