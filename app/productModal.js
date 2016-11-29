'use strict';

angular.module('myApp.productModal', [])
    .controller('productModalCtrl', ['$scope','serviceAjax','items','$filter', function ($scope,serviceAjax,items,$filter) {
        $scope.availableCost={};
        $scope.availableCategory={};
        $scope.availableDuration={};
        $scope.error= false;
        serviceAjax.costDispo().success(function(data) {
            $scope.availableCost = data
        });
        serviceAjax.categoryDispo().success(function(data) {
            $scope.availableCategory = data
        });
        serviceAjax.durationDispo().success(function(data) {
            $scope.availableDuration = data
        });
        serviceAjax.unitDispo().success(function(data) {
            $scope.availableUnits = data;
        });
        $scope.product = {name:""};
        $scope.product.name = items;
        $scope.save =function(){

            serviceAjax.postProduit($scope.product)
                .success(function(response) {
                    $scope.response = response.reussite==='ok';
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