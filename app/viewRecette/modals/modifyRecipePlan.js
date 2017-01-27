/**
 * Created by Gaga on 05/12/2016.
 */
'use strict';

angular.module('myApp.modifyRecipePlan', [])
    .controller('modifyRecipePlanCtrl', ['$scope','serviceAjax','recette','labels',
        function ($scope,serviceAjax,recette,labels) {
            $scope.label = labels;
            $scope.recipe = recette;
            serviceAjax.typePlatDispo().then(function(response) {
                $scope.availableTypes = response.data;
            });
            serviceAjax.getMenus().then(function(response) {
                $scope.existingMenu = response.data;
                console.log($scope.existingMenu);
            });

            $scope.getMenu =function(){
                console.log($scope.menu);
                serviceAjax.findMenu($scope.menu).then(function(response) {
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
