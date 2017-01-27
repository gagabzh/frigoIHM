/**
 * Created by Gaga on 04/12/2016.
 */
'use strict';

angular.module('myApp.viewProduct', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/stock/:id', {
            templateUrl: 'viewProduct/viewProduct.html',
            controller: 'View6Ctrl'
        });
    }])

    .controller('View6Ctrl', ['$scope','serviceAjax','labels','$routeParams','$uibModal',
        function($scope,serviceAjax,labels,$routeParams,$uibModal) {
            $scope.label = labels;
            $scope.id = $routeParams.id;
            $scope.data={};
            serviceAjax.detailProduct($scope.id).then(function (response) {
                $scope.item = response.data;
                $scope.data.products = [{product: $scope.item.product.name}];
                serviceAjax.findRecette($scope.data).then(function(response) {
                    $scope.recipe = response.data;
                    console.log($scope.recipe)
                });
            });
        }]);