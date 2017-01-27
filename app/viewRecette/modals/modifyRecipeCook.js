/**
 * Created by Gaga on 05/12/2016.
 */
'use strict';

angular.module('myApp.modifyRecipeCook', [])
    .controller('modifyRecipeCookCtrl', ['$scope','serviceAjax','recette','labels',
        function ($scope,serviceAjax,recette,labels) {
            $scope.label = labels;
            $scope.recipe = recette;
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
