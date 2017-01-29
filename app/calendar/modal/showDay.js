/**
 * Created by Gaga on 29/01/2017.
 */
'use strict';

angular.module('myApp.showDay', [])
    .controller('showDay', ['$scope','serviceAjax','labels',
        function ($scope,serviceAjax,labels) {
            $scope.label = labels;


            serviceAjax.typePlatDispo().then(function(response) {
                $scope.availableTypes = response.data;
            });
            $scope.getMenu =function(){
                serviceAjax.findMenu($scope.menu.previsionalDate).then(function(response) {
                    $scope.menu = response.data;
                });
            };
            $scope.save =function(){
                $scope.$close();
            };
            $scope.close =function(){
                $scope.$close();
            }
        }]);