'use strict';

angular.module('myApp.productModal', [])
    .controller('productModalCtrl', ['$scope','serviceAjax','items','$filter','labels',
        function ($scope,serviceAjax,items,$filter,labels) {
        $scope.label = labels;
        $scope.availableCost={};
        $scope.availableCategory={};
        $scope.availableDuration={};
        $scope.error= false;
        serviceAjax.costDispo().then(function(response) {
            $scope.availableCost = response.data
        });
        serviceAjax.categoryDispo().then(function(response) {
            $scope.availableCategory = response.data
        });
        serviceAjax.durationDispo().then(function(response) {
            $scope.availableDuration = response.data
        });
        serviceAjax.unitDispo().then(function(response) {
            $scope.availableUnits = response.data;
        });
        $scope.product = {name:null};
        $scope.product.name = items;
        $scope.save =function(){

            serviceAjax.postProduit($scope.product)
                .then(function(response) {
                    $scope.response = response.status===200;
                    if ($scope.response){
                        $scope.error= false;
                        $scope.$close($scope.product);
                    }else{
                        $scope.error= true;
                    }

                });
                //.fail(function(response){
                //    $scope.error= true;
                //});
        };
        $scope.close =function(){
            $scope.$close({name:""});
        }
    }]);