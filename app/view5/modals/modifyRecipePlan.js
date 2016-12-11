/**
 * Created by Gaga on 05/12/2016.
 */
'use strict';

angular.module('myApp.modifyRecipePlan', [])
    .controller('modifyRecipePlanCtrl', ['$scope','serviceAjax','recette','labels',
        function ($scope,serviceAjax,recette,labels) {
            $scope.label = labels;
            $scope.recipe = recette;
            serviceAjax.typePlatDispo().success(function(data) {
                $scope.availableTypes = data;
            });
            serviceAjax.getMenus().success(function(data) {
                $scope.existingMenu = data;
                console.log($scope.existingMenu);
            });

            $scope.getMenu =function(){
                console.log($scope.menu);
                serviceAjax.findMenu($scope.menu).success(function(data) {
                    $scope.menu = data;
                });
            };
            $scope.save =function(){
                $scope.$close();
            };
            $scope.close =function(){
                $scope.$close();
            }
        }]);
